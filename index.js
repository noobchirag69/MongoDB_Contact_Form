// Imports
const express = require('express');
const mongoose = require('mongoose');
const Message = require('./models/message');

// Configuring Dotenv
const dotenv = require('dotenv');
dotenv.config();

// Initiating Express
const app = express();

// Connect to MongoDB
const dbURI = process.env.MONGODB_URI;

// Starting the Server based on Database Connectivity
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(process.env.PORT || 3000))
    .catch(err => console.log(err));

// Middlewares
app.use(express.urlencoded({ extended: true }));

// Home Page
app.get('/', (req, res) => res.sendFile('./views/index.html', { root: __dirname }));

// Sending the message
app.post('/', (req, res) => {
    const message = new Message(req.body);
    message.save()
        .then(result => res.sendFile('./views/success.html', { root: __dirname }))
        .catch(err => res.status(404).sendFile('./views/error.html', { root: __dirname }));
});

// Error Page
app.use((req, res) =>
    res.status(404).sendFile('./views/error.html', { root: __dirname }));
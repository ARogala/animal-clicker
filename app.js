const express = require('express');
const mongoose = require('mongoose');

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.get('/getdata', (req, res) => {
	res.send({ hi: 'there' });
});

module.exports = app;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });


// app.use(bodyParser.json()); // for parsing application/json

app.get('/getdata', (req, res) => {
	res.send({ hi: 'there' });
});

app.put('/vote', (req,res) => {
	console.log(req.body);
	res.send({hi: 'it worked'});
});

module.exports = app;

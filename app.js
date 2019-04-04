const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
mongoose.connection
	.once('open', () => {
		console.log('connected to db');
	})
	.on('error', error => {
		console.warn('Warning', error);
	});

app.use(bodyParser.json()); // for parsing application/json

// to add new animals
// const animal = new Animal({name: 'animal50', clickCount: 0});
// animal.save()
routes(app);

if (process.env.NODE_ENV === 'production') {
	// express will serve up production assets
	// like our main.js and main.css files from client build
	app.use(express.static('client/build'));

	// Express will serve up the index.html file
	// if it doesnt recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

module.exports = app;

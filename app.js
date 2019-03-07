const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Animal = require('./models/Animal');
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
// const animal = new Animal({name: 'animal10', clickCount: 0});
// animal.save()
routes(app);

function resetCount() {
	Animal.updateMany({ clickCount: { $gt: 0 } }, { clickCount: 0 });
}

//resetCount();

module.exports = app;

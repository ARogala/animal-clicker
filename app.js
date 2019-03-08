const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Animal = require('./models/Animal').Animal;
const routes = require('./routes/routes');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
mongoose.connection
	.once('open', () => {
		console.log('connected to db');
		//only run server if connected to db
		runServer();
	})
	.on('error', error => {
		console.warn('Warning', error);
	});

function runServer() {
	let dateNow = new Date();
	let day = dateNow.getDay();
	console.log('day of week: ', day);
	app.use(bodyParser.json()); // for parsing application/json

	// to add new animals
	// const animal = new Animal({name: 'animal50', clickCount: 0});
	// animal.save()
	routes(app);

	//if Monday get and set 5 random weekly animals. This clears
	//the weeklyanimals collection and fills it with new animals
	//from animals collection. clickCouts will be reset to 0 bc 
	//by default clickCount is 0 in animals collection and 
	//animal collection clickCount is never incremented
	function getRandomAnimals(day) {
		if (day === 1) {
			Animal.aggregate([{ $sample: { size: 5 } }, { $out: 'weeklyanimals' }])
				.then(() => console.log('weekly animals updated.'))
				.catch(error => console.log(error));
		}
	}
	getRandomAnimals(day);
}

module.exports = app;

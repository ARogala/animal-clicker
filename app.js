const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Animal = require('./models/Animal').Animal;
const ResetGame = require('./models/ResetGame');
const routes = require('./routes/routes');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
mongoose.connection
	.once('open', () => {
		console.log('connected to db');
		//only run server if connected to db
		runServer();
		gameReset();
	})
	.on('error', error => {
		console.warn('Warning', error);
	});

function runServer() {
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
}

//game reset logic should prob be done with a cron job
//however since this app is on a free heroku dyno and the server is not always up
//I felt this quick hack should do the job well enough
//look into https://devcenter.heroku.com/articles/scheduler
//for a better solution
function gameReset() {
	let dateNow = new Date();
	let day = dateNow.getDay();
	let resetLogic;
	console.log('day of week: ', day);

	//if Monday get resetLogic from db and call getRandomAnimals
	// if (day === 1) {
	// 	ResetGame.find({})
	// 		.then(resets => {
	// 			resetLogic = resets[0].resetLogic;
	// 			getRandomAnimals(day, resetLogic);
	// 		})
	// 		.catch(error => console.log(error));
	// }

	// //if not Monday reset logic to true
	// if (day !== 1) {
	// 	ResetGame.find({})
	// 		.then(resets => {
	// 			resetLogic = resets[0].resetLogic;
	// 			if (resetLogic === false) {
	// 				ResetGame.updateOne({ resetLogic: false }, { resetLogic: true })
	// 					.then(() => console.log('logic reset to ture'))
	// 					.catch(error => console.log(error));
	// 			}
	// 		})
	// 		.catch(error => console.log(error));
	// }

	// //if Monday get and set 5 random weekly animals. This clears
	// //the weeklyanimals collection and fills it with new animals
	// //from animals collection. clickCouts will be reset to 0 bc
	// //by default clickCount is 0 in animals collection and
	// //animal collection clickCount is never incremented
	// //resetLogic is set to false so this only runs once on Monday
	// function getRandomAnimals(day, resetLogic) {
	// 	console.log(resetLogic);
	// 	if (day === 1 && resetLogic === true) {
	// 		Animal.aggregate([{ $sample: { size: 5 } }, { $out: 'weeklyanimals' }])
	// 			.then(() => {
	// 				console.log('weekly animals updated.');
	// 				ResetGame.updateOne({ resetLogic: true }, { resetLogic: false })
	// 					.then(() => console.log('logic reset to false'))
	// 					.catch(error => console.log(error));
	// 			})
	// 			.catch(error => console.log(error));
	// 	}
	// }
}

module.exports = app;

const mongoose = require('mongoose');
const Animal = require('./models/Animal').Animal;
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
mongoose.connection
	.once('open', () => {
		console.log('connected to db');
		gameReset();
	})
	.on('error', error => {
		console.warn('Warning', error);
	});

function gameReset() {
	let dateNow = new Date();
	let day = dateNow.getDay();

	console.log('day of week: ', day);

	//if Monday getRandomAnimals
	if (day === 1) {
		getRandomAnimals();
	} else {
		process.exit();
	}

	function getRandomAnimals() {
		Animal.aggregate([{ $sample: { size: 5 } }, { $out: 'weeklyanimals' }])
			.then(() => {
				console.log('weekly animals updated.');
				process.exit();
			})
			.catch(error => {
				console.log(error);
				process.exit();
			});
	}
}

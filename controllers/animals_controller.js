const WeeklyAnimal = require('../models/Animal').WeeklyAnimal;

module.exports = {
	getAnimal: function(req, res) {
		const animalName = req.body.name;
		WeeklyAnimal.findOne({ name: animalName })
			.then(animal => {
				res.json(animal);
			})
			.catch(error => console.log(error));
	},
	getAllAnimals: function(req, res) {
		WeeklyAnimal.find({})
			.then(animals => {
				res.json(animals);
			})
			.catch(error => console.log(error));
	},
	getWinners: function(req, res) {
		WeeklyAnimal.find({})
			.sort({ clickCount: -1 })
			.limit(3)
			.then(animals => {
				res.json(animals);
			})
			.catch(error => console.log(error));
	},
	vote: function(req, res) {
		const animalName = req.body.name;
		WeeklyAnimal.updateOne({ name: animalName }, { $inc: { clickCount: 1 } })
			.then(() => WeeklyAnimal.findOne({ name: animalName }))
			.then(animal => {
				res.json(animal);
			})
			.catch(error => console.log(error));
	}
};

const WeeklyAnimal = require('../models/Animal').WeeklyAnimal;

module.exports = {
	getAnimal: function(req, res) {
		const animalName = req.body.name;
		WeeklyAnimal.findOne({ name: animalName }).then(animal => {
			res.json(animal);
		});
	},
	getAllAnimals: function(req, res) {
		WeeklyAnimal.find({}).then(animals => {
			res.json(animals);
		});
	},
	vote: function(req, res) {
		const animalName = req.body.name;
		WeeklyAnimal.updateOne({ name: animalName }, { $inc: { clickCount: 1 } })
			.then(() => WeeklyAnimal.findOne({ name: animalName }))
			.then(animal => {
				res.json(animal);
			});
	}
};
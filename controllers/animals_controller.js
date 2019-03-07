const Animal = require('../models/Animal');

module.exports = {
	getAnimal: function(req, res) {
		const animalName = req.body.name;
		Animal.findOne({ name: animalName }).then(animal => {
			res.send(animal);
		});
	},
	getAllAnimals: function(req, res) {
		Animal.find({}).then(animals => {
			res.send(animals);
		});
	},
	vote: function(req, res) {
		const animalName = req.body.name;
		Animal.updateOne({ name: animalName }, { $inc: { clickCount: 1 } })
			.then(() => Animal.findOne({ name: animalName }))
			.then(animal => {
				res.send(animal);
			});
	}
};

const Animal = require('../models/Animal');

module.exports = {
	getAnimal: function(req, res) {
		const animalName = req.body.name;
		Animal.findOne({ name: animalName }).then(animal => {
			// res.send(JSON.stringify(animal));
			res.json(animal);
		});
	},
	getAllAnimals: function(req, res) {
		Animal.find({ name: { $in: ['animal1', 'animal2'] } }).then(animals => {
			console.log(typeof animals);
			// res.send(JSON.stringify(animals));
			res.json(animals);
		});
	},
	vote: function(req, res) {
		const animalName = req.body.name;
		Animal.updateOne({ name: animalName }, { $inc: { clickCount: 1 } })
			.then(() => Animal.findOne({ name: animalName }))
			.then(animal => {
				// res.send(JSON.stringify(animal));
				res.json(animal);
			});
	}
};

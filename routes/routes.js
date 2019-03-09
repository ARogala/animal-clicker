const AnimalsController = require('../controllers/animals_controller');

module.exports = app => {
	app.get('/getanimal', AnimalsController.getAnimal);

	app.get('/getallanimals', AnimalsController.getAllAnimals);

	app.get('/getwinners', AnimalsController.getWinners);

	app.put('/vote', AnimalsController.vote)
}
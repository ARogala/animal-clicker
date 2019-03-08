const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	clickCount: {
		type: Number,
		default: 0
	}
});

const Animal = mongoose.model('animal', AnimalSchema);
const WeeklyAnimal = mongoose.model('weeklyanimal', AnimalSchema);

module.exports.Animal = Animal;
module.exports.WeeklyAnimal = WeeklyAnimal;

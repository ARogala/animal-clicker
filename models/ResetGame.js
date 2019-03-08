const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResetGameSchema = new Schema({
	resetLogic: {
		type: Boolean,
		required: true,
		default: true
	}
});

const ResetGame = mongoose.model('reset', ResetGameSchema);

module.exports = ResetGame;

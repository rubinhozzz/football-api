const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
	photoUrl: String,
	countryCode: String
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
	profilePhoto: {
		data: Buffer,
		contentType: String
	},

});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
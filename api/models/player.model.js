const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
}, {
	timestamps: true,
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;

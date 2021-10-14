const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
	name: String
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
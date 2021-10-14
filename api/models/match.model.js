const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
	location: String,
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
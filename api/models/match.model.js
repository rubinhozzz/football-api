const mongoose = require('mongoose');
//const location = require('./location.model');

const matchSchema = mongoose.Schema({
	location: {type: mongoose.Types.ObjectId, ref: 'Location'},
	datetime: Date,
	teamAName: String,
	teamBName: String,
	teamA: [{type: mongoose.Types.ObjectId, ref: 'Player'}],
	teamB: [{type: mongoose.Types.ObjectId, ref: 'Player'}],
	teamAScore: Number,
	teamBScore: Number,
	pichichi: [{type: mongoose.Types.ObjectId, ref: 'Player'}],
	mvp: [{type: mongoose.Types.ObjectId, ref: 'Player'}],
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
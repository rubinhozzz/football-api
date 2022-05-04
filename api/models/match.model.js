const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
	location: {type: mongoose.Types.ObjectId, ref: 'Location'},
	datetime: Date,
	teamAName: String,
	teamBName: String,
	teamA: [{type: mongoose.Types.ObjectId, ref: 'Player'}],
	teamB: [{type: mongoose.Types.ObjectId, ref: 'Player'}],
	teamAScore: {type: Number, default: 0},
	teamBScore: {type: Number, default: 0},
	pichichi: [{type: mongoose.Types.ObjectId, ref: 'Player'}],
	mvp: {type: mongoose.Types.ObjectId, ref: 'Player', default:null},
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
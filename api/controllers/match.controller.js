const Match = require('../models/match.model');

class MatchController {

	getAll(req, res) {
		Match.find({})
			.populate('location')
			.populate('teamA')
			.populate('teamB')
			.exec(function(err, matches) {
				res.send(matches);
		});
	}

	async create(req, res) {
		console.log(req.body.teamA);
		//let teamA = req.body.teamA
		try {
			const match = new Match({
				location: req.body.location,
				datetime: req.body.datetime,
				teamAName: req.body.teamAName,
				teamBname: req.body.teamBName,
				teamA: req.body.teamA,
				teamB: req.body.teamB
			});
			await match.save()
			res.send(match);	
		} catch (error) {
			console.log(error);
		}
		
	}
}

module.exports = MatchController;
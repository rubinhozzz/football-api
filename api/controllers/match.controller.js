const Match = require('../models/match.model');

class MatchController {

	getAll(req, res) {
		console.log(req.query)
		let params = {}
		if (req.query.location != '0')
			params['location'] = req.query.location
		if (req.query.mvp != '0')
			params['mvp'] = req.query.mvp
		if (req.query.pichichi != '0')
			params['pichichi'] = {$in: [req.query.pichichi]}
		console.log(params)
		Match.find(params)
			.populate('location')
			.populate('teamA')
			.populate('teamB')
			.exec(function(err, matches) {
				res.send(matches);
		});
	}

	async create(req, res) {
		try {
			const match = new Match({
				location: req.body.location,
				datetime: req.body.datetime,
				teamAName: req.body.teamAName,
				teamBName: req.body.teamBName,
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
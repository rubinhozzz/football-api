const Match = require('../models/match.model');

class MatchController {

	getAll(req, res) {
		let params = {}
		if (req.query.location != '0')
			params['location'] = req.query.location
		if (req.query.mvp != '0')
			params['mvp'] = req.query.mvp
		if (req.query.pichichi != '0')
			params['pichichi'] = {$in: [req.query.pichichi]}
		Match.find(params)
			.populate('location')
			.populate('teamA')
			.populate('teamB')
			.exec(function(err, matches) {
				res.send(matches);
		});
	}

	async get(req, res) {
		try {
			let match = await Match.findById(req.params.id).exec();
			res.send(match);	
		} catch (error) {
			console.log(error);
		}
	}

	async create(req, res) {
		try {
			console.log(req.body);
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

	async update(req, res) {
		try {
			console.log(req.body);
			let match = await Match.findOneAndUpdate({_id: req.params.id}, {
				teamAScore: req.body.teamAScore,
				teamBScore: req.body.teamBScore,
				pichichi: req.body.pichichi,
				mvp: req.body.mvp,
			}, { new: true });
			res.send(match);	
		} catch (error) {
			console.log(error);
		}
	}

	delete(req, res) {
		Match.deleteOne({ _id: req.params.id }, function (err) {
			if (err) return handleError(err);
			// deleted at most one player document
		});
	}
}

module.exports = MatchController;
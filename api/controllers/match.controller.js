const Match = require('../models/match.model');

class MatchController {

	getAll(req, res) {
		Match.find({}, function(err, matches) {

			/*let matchMap = {};
			matches.forEach(function(match) {
				matchMap[match._id] = match;
			});
			res.send(matchMap);  */
			res.send(matches);
		});
	}

	async create(req, res) {
		console.log(req.body);
		/*const player = new Player({
			firstname: req.body.firstname,
			lastname: req.body.lastname
		});
		
		await player.save()*/
		//res.send(player);
	}
}

module.exports = MatchController;
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
}

module.exports = MatchController;
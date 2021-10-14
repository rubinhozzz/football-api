const Player = require('../models/player.model');

class PlayerController {

	getAll(req, res) {
		Player.find({}, function(err, players) {
			/*let playerMap = {};
			players.forEach(function(player) {
				playerMap[player._id] = player;
			});
			res.send(playerMap);*/
			res.send(players);
		});
	}
}

module.exports = PlayerController;

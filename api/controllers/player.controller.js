const Player = require('../models/player.model');

class PlayerController {

	getAll(req, res) {
		Player.find({}, function(err, players) {
			res.send(players);
		});
	}

	async create(req, res) {
		console.log('CREATE1!!!!');
		console.log(req.body);
		console.log(req.file);
		const player = new Player({
			firstname: req.body.firstname,
			lastname: req.body.lastname
		});
		//await player.save()
		//res.send(player);
	}

	update = async(req, res) => {
		let player = await Player.findOneAndUpdate({_id: req.params.id}, {
			firstname: req.body.firstname,
			lastname: req.body.lastname
		}, { new: true });
	}

	get = async(req, res) => {
		let player = await Player.findById(req.params.id).exec();
		console.log(player);
		res.send(player);
	}

	delete(req, res) {
		Player.deleteOne({ _id: req.params.id }, function (err) {
			if (err) return handleError(err);
			// deleted at most one player document
		});
	}
}

module.exports = PlayerController;

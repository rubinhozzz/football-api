const Player = require('../models/player.model');
var fs = require('fs');

class PlayerController {

	getAll(req, res) {
		Player.find({}, function(err, players) {
			res.send(players);
		});
	}

	async create(req, res) {
		const player = new Player({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			profilePhoto: {
				data: req.files.file.data,
				contentType: req.files.file.mimetype
			}
		});
		await player.save()
		res.send(player);
	}

	update = async(req, res) => {
		let player = await Player.findOneAndUpdate({_id: req.params.id}, {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			profilePhoto: {
				data: req.files.file.data,
				contentType: req.files.file.mimetype
			}
		}, { new: true });
	}

	get = async(req, res) => {
		let player = await Player.findById(req.params.id).exec();
		res.send(player);
	}

	delete(req, res, next) {
		console.log(req.params.id);
		Player.deleteOne({ _id: req.params.id }, function (err) {
			console.log(err);
			//if (err) return handleError(err);
			// deleted at most one player document
		});
	}
}

module.exports = PlayerController;

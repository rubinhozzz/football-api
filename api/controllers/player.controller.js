const Player = require('../models/player.model');

class PlayerController {

	getAll(req, res) {
		Player.find({}, function(err, players) {
			res.send(players);
		});
	}

	async create(req, res) {
		let params = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
		};
		if (req.files)
			params['profilePhoto'] = {
				data: req.files.file.data,
				contentType: req.files.file.mimetype
			}
		const player = new Player(params);
		await player.save()
		res.send(player);
	}

	update = async(req, res) => {
		let params = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
		};
		if (req.files)
			params['profilePhoto'] = {
				data: req.files.file.data,
				contentType: req.files.file.mimetype
			}
		let player = await Player.findOneAndUpdate({_id: req.params.id}, params, { new: true });
	}

	get = async(req, res) => {
		let player = await Player.findById(req.params.id).exec();
		res.send(player);
	}

	delete(req, res, next) {
		Player.deleteOne({ _id: req.params.id }, function (err) {
			//if (err) return handleError(err);
			// deleted at most one player document
		});
	}
}

module.exports = PlayerController;

const Player = require('../models/player.model');

class PlayerController {

	async getAll(req, res) {
		const results = await Player.aggregate([
			{
				'$lookup': {
					'from': 'matches',
					'let': { 'myId': { '$toString': '$_id' } },
					'pipeline': [
						{
						'$match': {
							'$expr': {
								'$in': [ "$$myId", { '$map': {
									'input': {"$setUnion": [ "$teamA", "$teamB" ]}, 
									'as': 'playerId',
									'in': {
										'$toString': '$$playerId'
										} 
									}
								}
								]
							}
							}
						},
						{ '$sort': {'datetime': -1} },
						{ '$limit': 2}
					],
					'as': 'games'
			  }
			},
			//{ "$unset": "matchCount" }
		])
		console.log(results);
		res.send(results);
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
		try {
			let player = await Player.findById(req.params.id).exec();
			res.send(player);	
		} catch (error) {
			console.log(error);
		}
		
	}

	delete(req, res, next) {
		Player.deleteOne({ _id: req.params.id }, function (err) {
			//if (err) return handleError(err);
			// deleted at most one player document
		});
	}
}

module.exports = PlayerController;

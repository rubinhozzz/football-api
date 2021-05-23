const playerModel = require('../models/player.model');

exports.getAll = async (req, res) => {
	const result = await playerModel.getPlayers();
	res.json(result)
}

exports.create = (req, res) => {
	res.send('not implemented')
}

exports.update = (req, res) => {
	res.send('not implemented')
}

exports.get = (req, res) => {
	res.send('not implemented')
}

exports.delete = (req, res) => {
	res.send('not implemented')
}

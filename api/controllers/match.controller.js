const matchModel = require('../models/match.model');

exports.getAll = async (req, res) => {
	const result = await matchModel.getMatches();
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

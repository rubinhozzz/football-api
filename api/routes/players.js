var express = require('express');
var router = express.Router();
let Player = require('../models/player.model');

/* GET users listing. */
router.get('/', (req, res) => {
	Player.find()
		.then(players => res.json(players))
		.catch(err => res.status(400).json('Error ' + err));
});
/*
router.get('/add', function(req, res, next) {
    res.send('respond with a resource create player');
});*/

module.exports = router;

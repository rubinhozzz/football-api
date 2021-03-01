var express = require('express');
var router = express.Router();
const playerController = require('../controllers/player.controller');

router.get('/players/', playerController.getAll);

router.post('players/', playerController.create);

router.put('players/:id', playerController.update);

router.get('/players/:id', playerController.get);

router.delete('players/delete/:id', playerController.delete);

module.exports = router;

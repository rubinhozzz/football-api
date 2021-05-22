var express = require('express');
var router = express.Router();
const playerController = require('../controllers/player.controller');

router.get('/', playerController.getAll);

router.post('/', playerController.create);

router.put('/:id', playerController.update);

router.get('/:id', playerController.get);

router.delete('/delete/:id', playerController.delete);

module.exports = router;

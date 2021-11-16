var express = require('express');
var router = express.Router();
const PlayerController = require('../controllers/player.controller');
var playerController = new PlayerController();

router.get('/', playerController.getAll);
router.post('/add', playerController.create);
router.put('/:id', playerController.update);
router.get('/:id', playerController.get);
router.delete('/delete/:id', playerController.delete);

module.exports = router;

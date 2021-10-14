var express = require('express');
var router = express.Router();
const MatchController = require('../controllers/match.controller');
var matchController = new MatchController();

router.get('/', matchController.getAll);
/*router.post('/', matchController.create);
router.put('/:id', matchController.update);
router.get('/:id', matchController.get);
router.delete('/delete/:id', matchController.delete);*/

module.exports = router;

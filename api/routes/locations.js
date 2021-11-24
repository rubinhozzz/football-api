var express = require('express');
var router = express.Router();
const LocationController = require('../controllers/location.controller');
var locationController = new LocationController();

router.get('/', locationController.getAll);
/*router.post('/add', playerController.create);
router.put('/:id', playerController.update);
router.get('/:id', playerController.get);
router.delete('/delete/:id', playerController.delete);*/

module.exports = router;

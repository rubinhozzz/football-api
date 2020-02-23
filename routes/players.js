var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('players', { title: 'Players' });
});


router.get('/add', function(req, res, next) {
    res.send('respond with a resource create player');
});

module.exports = router;
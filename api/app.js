const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
const playersRouter = require('./routes/players');
app.use('/players', playersRouter);
app.listen(port, () => console.log('hey!'))

mongoose.connect('mongodb://localhost/aves', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected!!!!');
});

module.exports = app;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bb = require('express-busboy');
const app = express();
const port = 8000;

bb.extend(app, {upload:true});

mongoose.connect("mongodb://localhost:27017/aves", {
	useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
	console.log("err", err);
})
mongoose.connection.on("connected", (err, res) => {
	console.log("mongoose is connected");
})

app.use(cors());
app.use(express.json());
const playersRouter = require('./routes/players');
const matchesRouter = require('./routes/matches');
const locationsRouter = require('./routes/locations');
app.use('/players', playersRouter);
app.use('/matches', matchesRouter);
app.use('/locations', locationsRouter);
app.listen(port, () => console.log('hey!'))

module.exports = app;

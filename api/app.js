const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
const playersRouter = require('./routes/players');
const matchesRouter = require('./routes/matches');
app.use('/players', playersRouter);
app.use('/matches', matchesRouter);
app.listen(port, () => console.log('hey!'))
module.exports = app;

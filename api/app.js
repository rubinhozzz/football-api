const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
const playersRouter = require('./routes/players');
app.use('/players', playersRouter);
app.listen(port, () => console.log('hey!'))
module.exports = app;

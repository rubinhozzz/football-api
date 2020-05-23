const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => console.log('hey!'))

module.exports = app;

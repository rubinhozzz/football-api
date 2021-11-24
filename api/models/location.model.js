const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
	name: String,
	address: String,
	postcode: String,
	city: String
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
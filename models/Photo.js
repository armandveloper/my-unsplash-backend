const { Schema, model } = require('mongoose');

const photoSchema = new Schema({
	label: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
});

module.exports = model('Photo', photoSchema);

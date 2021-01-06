const mongoose = require('mongoose');

const { DB_URI } = process.env;

const connectDB = async () => {
	try {
		await mongoose.connect(DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		console.log('Connection with the db has been established');
	} catch (error) {
		console.log(error);
		throw new Error('An Error ocurred with the db connection');
	}
};

module.exports = connectDB;

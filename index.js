require('dotenv').config();
const connectDB = require('./db');
const app = require('./server');

connectDB();
app.listen(process.env.PORT, () =>
	console.log('Server running on port:', process.env.PORT)
);

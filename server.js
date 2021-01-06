const path = require('path');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { nanoid } = require('nanoid');

const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		optionsSuccessStatus: 200,
	})
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const storage = multer.diskStorage({
	destination: path.join(__dirname, 'public', 'uploads'),
	filename: (req, file, cb) => {
		let fileName = nanoid() + path.extname(file.originalname);
		req.fileName = fileName;
		cb(null, fileName);
	},
});
app.use(multer({ storage }).single('photo'));
app.use('/api', require('./routes/index.routes'));

module.exports = app;

const Photo = require('../models/Photo');

exports.getPhotos = async (req, res) => {
	const { start } = req.query;
	try {
		let photos = await Photo.find({}, null, { skip: +start, limit: 10 });
		photos = photos.map(({ label, name, _id }) => ({
			label,
			_id,
			url: `https://node-my-unsplash.herokuapp.com/static/uploads/${name}`,
		}));
		res.json({ ok: true, photos });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			ok: false,
			msg: "Cant' load the photos",
		});
	}
};

exports.savePhoto = async (req, res) => {
	try {
		const photoDB = await Photo.create({
			label: req.body.label,
			name: req.fileName,
		});
		const photoUrl = `https://node-my-unsplash.herokuapp.com/static/uploads/${req.fileName}`;
		res.json({
			ok: true,
			msg: 'Photo was saved',
			photo: {
				label: photoDB.label,
				url: photoUrl,
				id: photoDB._id,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			ok: false,
			msg: 'Internal Server error. Please try later',
		});
	}
};

exports.deletePhoto = async (req, res) => {
	const { id } = req.params;
	try {
		await Photo.findByIdAndDelete(id);
		res.json({ ok: true, msg: 'Photo deleted' });
	} catch (err) {
		console.log(err);
		res.json({
			ok: false,
			msg: 'An error ocurred. Please try later',
		});
	}
};

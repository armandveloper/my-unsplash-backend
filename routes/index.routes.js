const { Router } = require('express');
const {
	getPhotos,
	savePhoto,
	deletePhoto,
} = require('../controllers/photos.controller');

const router = Router();

router.get('/photos', getPhotos);
router.post('/photos', savePhoto);
router.delete('/photos/:id', deletePhoto);

module.exports = router;

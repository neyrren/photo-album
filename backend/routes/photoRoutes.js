const express = require('express');
const upload = require('../middleware/upload');
const { verifyToken } = require('../middleware/auth');
const {
  getPhotosByAlbum,
  uploadPhotos,
  deletePhoto,
} = require('../controllers/photoController');

const router = express.Router();

router.get('/album/:albumId', verifyToken, getPhotosByAlbum);
router.post('/album/:albumId', verifyToken, upload.array('photos', 50), uploadPhotos);
router.delete('/:photoId', verifyToken, deletePhoto);

module.exports = router;
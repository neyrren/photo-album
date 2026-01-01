const express = require('express');
const { verifyToken } = require('../middleware/auth');
const {
  getAlbums,
  createAlbum,
  deleteAlbum,
} = require('../controllers/albumController');

const router = express.Router();

router.get('/', verifyToken, getAlbums);
router.post('/', verifyToken, createAlbum);
router.delete('/:id', verifyToken, deleteAlbum);

module.exports = router;
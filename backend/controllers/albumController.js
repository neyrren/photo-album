const Album = require('../models/Album');
const Photo = require('../models/Photo');
const { groupPhotosByDate } = require('../utils/helpers');

const getAlbums = async (req, res) => {
  try {
    const userId = req.userId;
    const albums = await Album.findByUserId(userId);

    // Add photo count to each album
    const albumsWithStats = await Promise.all(
      albums.map(async (album) => {
        const photoCount = await Album.getPhotoCount(album.id);
        const totalSize = await Album.getTotalSize(album.id);
        return {
          ...album,
          photoCount,
          totalSize,
        };
      })
    );

    res.json(albumsWithStats);
  } catch (err) {
    console.error('Get albums error:', err);
    res.status(500).json({ error: 'Failed to fetch albums' });
  }
};

const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Valid album ID is required' });
    }

    const album = await Album.findByUserAndId(userId, id);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }

    const photoCount = await Album.getPhotoCount(album.id);
    const totalSize = await Album.getTotalSize(album.id);

    res.json({
      ...album,
      photoCount,
      totalSize,
    });
  } catch (err) {
    console.error('Get album error:', err);
    res.status(500).json({ error: 'Failed to fetch album' });
  }
};

const createAlbum = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.userId;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ error: 'Album title is required' });
    }

    if (title.length > 100) {
      return res.status(400).json({
        error: 'Album title must be 100 characters or less',
      });
    }

    const albumId = await Album.create(userId, title, description || null);

    res.status(201).json({
      id: albumId,
      userId,
      title,
      description: description || null,
      photoCount: 0,
      totalSize: 0,
      createdAt: new Date(),
    });
  } catch (err) {
    console.error('Create album error:', err);
    res.status(500).json({ error: 'Failed to create album' });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const userId = req.userId;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Valid album ID is required' });
    }

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Album title is required' });
    }

    const album = await Album.findByUserAndId(userId, id);
    if (!album) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Album.update(id, title, description || null);

    res.json({
      message: 'Album updated successfully',
      id,
      title,
      description: description || null,
    });
  } catch (err) {
    console.error('Update album error:', err);
    res.status(500).json({ error: 'Failed to update album' });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Valid album ID is required' });
    }

    const album = await Album.findByUserAndId(userId, id);
    if (!album) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Album.delete(id);

    res.json({ message: 'Album deleted successfully' });
  } catch (err) {
    console.error('Delete album error:', err);
    res.status(500).json({ error: 'Failed to delete album' });
  }
};

module.exports = {
  getAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
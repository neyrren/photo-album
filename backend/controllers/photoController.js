const Photo = require('../models/Photo');
const Album = require('../models/Album');
const fs = require('fs');
const path = require('path');
const { groupPhotosByDate } = require('../utils/helpers');

const getPhotosByAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const userId = req.userId;

    if (!albumId || isNaN(albumId)) {
      return res.status(400).json({ error: 'Valid album ID is required' });
    }

    const album = await Album.findByUserAndId(userId, albumId);
    if (!album) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const photos = await Photo.findByAlbumId(albumId);
    const groupedPhotos = groupPhotosByDate(photos);

    res.json(groupedPhotos);
  } catch (err) {
    console.error('Get photos error:', err);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
};

const getPhotosByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.userId;

    if (!startDate || !endDate) {
      return res.status(400).json({
        error: 'Start date and end date are required',
      });
    }

    const photos = await Photo.findByDateRange(userId, startDate, endDate);
    const groupedPhotos = groupPhotosByDate(photos);

    res.json(groupedPhotos);
  } catch (err) {
    console.error('Get photos by date error:', err);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
};

const uploadPhotos = async (req, res) => {
  try {
    const { albumId } = req.params;
    const userId = req.userId;

    if (!albumId || isNaN(albumId)) {
      return res.status(400).json({ error: 'Valid album ID is required' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files provided' });
    }

    if (req.files.length > 50) {
      return res.status(400).json({ error: 'Maximum 50 files allowed per upload' });
    }

    const album = await Album.findByUserAndId(userId, albumId);
    if (!album) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const uploadedPhotos = [];
    const failedUploads = [];

    for (const file of req.files) {
      try {
        const photoId = await Photo.create(
          albumId,
          userId,
          file.filename,
          file.originalname,
          `/uploads/${file.filename}`,
          file.size,
          file.mimetype
        );

        uploadedPhotos.push({
          id: photoId,
          filename: file.filename,
          originalName: file.originalname,
          filePath: `/uploads/${file.filename}`,
          fileSize: file.size,
          mimeType: file.mimetype,
          uploadedAt: new Date(),
        });
      } catch (err) {
        failedUploads.push({
          filename: file.originalname,
          error: err.message,
        });
      }
    }

    const response = {
      message: `${uploadedPhotos.length} photo(s) uploaded successfully`,
      uploadedPhotos,
    };

    if (failedUploads.length > 0) {
      response.failedUploads = failedUploads;
    }

    res.status(201).json(response);
  } catch (err) {
    console.error('Upload photos error:', err);
    res.status(500).json({ error: 'Failed to upload photos' });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const { photoId } = req.params;
    const userId = req.userId;

    if (!photoId || isNaN(photoId)) {
      return res.status(400).json({ error: 'Valid photo ID is required' });
    }

    const photo = await Photo.findById(photoId);
    if (!photo || photo.user_id !== userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Delete physical file
    const filePath = path.join(__dirname, '../', photo.file_path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await Photo.delete(photoId);

    res.json({ message: 'Photo deleted successfully' });
  } catch (err) {
    console.error('Delete photo error:', err);
    res.status(500).json({ error: 'Failed to delete photo' });
  }
};

const deletePhotos = async (req, res) => {
  try {
    const { photoIds } = req.body;
    const userId = req.userId;

    if (!Array.isArray(photoIds) || photoIds.length === 0) {
      return res.status(400).json({
        error: 'Photo IDs array is required',
      });
    }

    let deletedCount = 0;
    const failedDeletes = [];

    for (const photoId of photoIds) {
      try {
        const photo = await Photo.findById(photoId);
        if (!photo || photo.user_id !== userId) {
          failedDeletes.push({ photoId, error: 'Not authorized' });
          continue;
        }

        const filePath = path.join(__dirname, '../', photo.file_path);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }

        await Photo.delete(photoId);
        deletedCount++;
      } catch (err) {
        failedDeletes.push({ photoId, error: err.message });
      }
    }

    const response = {
      message: `${deletedCount} photo(s) deleted successfully`,
      deletedCount,
    };

    if (failedDeletes.length > 0) {
      response.failedDeletes = failedDeletes;
    }

    res.json(response);
  } catch (err) {
    console.error('Delete photos error:', err);
    res.status(500).json({ error: 'Failed to delete photos' });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const { photoId } = req.params;
    const userId = req.userId;

    if (!photoId || isNaN(photoId)) {
      return res.status(400).json({ error: 'Valid photo ID is required' });
    }

    const photo = await Photo.findById(photoId);
    if (!photo || photo.user_id !== userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Toggle favorite
    const isFavorite = true;
    if (isFavorite) {
      await Photo.addFavorite(photoId);
    } else {
      await Photo.removeFavorite(photoId);
    }

    res.json({
      message: 'Favorite toggled successfully',
      photoId,
      isFavorite,
    });
  } catch (err) {
    console.error('Toggle favorite error:', err);
    res.status(500).json({ error: 'Failed to toggle favorite' });
  }
};

module.exports = {
  getPhotosByAlbum,
  getPhotosByDateRange,
  uploadPhotos,
  deletePhoto,
  deletePhotos,
};
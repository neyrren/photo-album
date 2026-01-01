const pool = require('../config/database');

class Photo {
  static async create(albumId, userId, filename, originalName, filePath, fileSize, mimeType) {
    try {
      const [result] = await pool.query(
        'INSERT INTO photos (album_id, user_id, filename, original_name, file_path, file_size, mime_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [albumId, userId, filename, originalName, filePath, fileSize, mimeType]
      );
      return result.insertId;
    } catch (err) {
      throw err;
    }
  }

  static async findById(id) {
    try {
      const [photo] = await pool.query(
        'SELECT id, album_id, user_id, filename, original_name, file_path, file_size, mime_type, uploaded_at FROM photos WHERE id = ?',
        [id]
      );
      return photo.length > 0 ? photo[0] : null;
    } catch (err) {
      throw err;
    }
  }

  static async findByAlbumId(albumId) {
    try {
      const [photos] = await pool.query(
        'SELECT id, filename, original_name, file_path, file_size, mime_type, uploaded_at FROM photos WHERE album_id = ? ORDER BY uploaded_at DESC',
        [albumId]
      );
      return photos;
    } catch (err) {
      throw err;
    }
  }

  static async findByUserId(userId) {
    try {
      const [photos] = await pool.query(
        'SELECT id, album_id, filename, original_name, file_path, file_size, mime_type, uploaded_at FROM photos WHERE user_id = ? ORDER BY uploaded_at DESC',
        [userId]
      );
      return photos;
    } catch (err) {
      throw err;
    }
  }

  static async findByDateRange(userId, startDate, endDate) {
    try {
      const [photos] = await pool.query(
        'SELECT id, album_id, filename, original_name, file_path, file_size, uploaded_at FROM photos WHERE user_id = ? AND uploaded_at BETWEEN ? AND ? ORDER BY uploaded_at DESC',
        [userId, startDate, endDate]
      );
      return photos;
    } catch (err) {
      throw err;
    }
  }

  static async update(id, updates) {
    try {
      const allowedFields = ['original_name', 'filename'];
      const updateFields = [];
      const updateValues = [];

      Object.keys(updates).forEach((key) => {
        if (allowedFields.includes(key)) {
          updateFields.push(`${key} = ?`);
          updateValues.push(updates[key]);
        }
      });

      if (updateFields.length === 0) return false;

      updateValues.push(id);
      const query = `UPDATE photos SET ${updateFields.join(', ')} WHERE id = ?`;
      const [result] = await pool.query(query, updateValues);
      return result.affectedRows > 0;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      await pool.query('DELETE FROM photos WHERE id = ?', [id]);
    } catch (err) {
      throw err;
    }
  }

  static async deleteByAlbumId(albumId) {
    try {
      await pool.query('DELETE FROM photos WHERE album_id = ?', [albumId]);
    } catch (err) {
      throw err;
    }
  }

  static async addFavorite(photoId) {
    try {
      const [result] = await pool.query(
        'UPDATE photo_metadata SET is_favorite = 1 WHERE photo_id = ?',
        [photoId]
      );
      return result.affectedRows > 0;
    } catch (err) {
      throw err;
    }
  }

  static async removeFavorite(photoId) {
    try {
      const [result] = await pool.query(
        'UPDATE photo_metadata SET is_favorite = 0 WHERE photo_id = ?',
        [photoId]
      );
      return result.affectedRows > 0;
    } catch (err) {
      throw err;
    }
  }

  static async getFavorites(albumId) {
    try {
      const [photos] = await pool.query(
        'SELECT p.id, p.filename, p.file_path, p.uploaded_at FROM photos p INNER JOIN photo_metadata pm ON p.id = pm.photo_id WHERE p.album_id = ? AND pm.is_favorite = 1 ORDER BY p.uploaded_at DESC',
        [albumId]
      );
      return photos;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Photo;
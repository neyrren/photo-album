const pool = require('../config/database');

class Album {
  static async create(userId, title, description = null) {
    try {
      const [result] = await pool.query(
        'INSERT INTO albums (user_id, title, description) VALUES (?, ?, ?)',
        [userId, title, description]
      );
      return result.insertId;
    } catch (err) {
      throw err;
    }
  }

  static async findById(id) {
    try {
      const [album] = await pool.query(
        'SELECT id, user_id, title, description, created_at, updated_at FROM albums WHERE id = ?',
        [id]
      );
      return album.length > 0 ? album[0] : null;
    } catch (err) {
      throw err;
    }
  }

  static async findByUserAndId(userId, albumId) {
    try {
      const [album] = await pool.query(
        'SELECT id, user_id, title, description, created_at, updated_at FROM albums WHERE id = ? AND user_id = ?',
        [albumId, userId]
      );
      return album.length > 0 ? album[0] : null;
    } catch (err) {
      throw err;
    }
  }

  static async findByUserId(userId) {
    try {
      const [albums] = await pool.query(
        'SELECT id, title, description, created_at, updated_at FROM albums WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );
      return albums;
    } catch (err) {
      throw err;
    }
  }

  static async update(id, title, description) {
    try {
      const [result] = await pool.query(
        'UPDATE albums SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [title, description, id]
      );
      return result.affectedRows > 0;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      await pool.query('DELETE FROM albums WHERE id = ?', [id]);
    } catch (err) {
      throw err;
    }
  }

  static async getPhotoCount(albumId) {
    try {
      const [result] = await pool.query(
        'SELECT COUNT(*) as count FROM photos WHERE album_id = ?',
        [albumId]
      );
      return result[0].count;
    } catch (err) {
      throw err;
    }
  }

  static async getTotalSize(albumId) {
    try {
      const [result] = await pool.query(
        'SELECT SUM(file_size) as total_size FROM photos WHERE album_id = ?',
        [albumId]
      );
      return result[0].total_size || 0;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Album;
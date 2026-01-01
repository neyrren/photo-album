const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(username, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await pool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );
      return result.insertId;
    } catch (err) {
      throw err;
    }
  }

  static async findByEmail(email) {
    try {
      const [user] = await pool.query(
        'SELECT id, username, email, password FROM users WHERE email = ?',
        [email]
      );
      return user.length > 0 ? user[0] : null;
    } catch (err) {
      throw err;
    }
  }

  static async findById(id) {
    try {
      const [user] = await pool.query(
        'SELECT id, username, email, created_at FROM users WHERE id = ?',
        [id]
      );
      return user.length > 0 ? user[0] : null;
    } catch (err) {
      throw err;
    }
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async updateLastLogin(id) {
    try {
      await pool.query(
        'UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [id]
      );
    } catch (err) {
      throw err;
    }
  }

  static async deleteUser(id) {
    try {
      await pool.query('DELETE FROM users WHERE id = ?', [id]);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
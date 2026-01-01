// backend/controllers/authController.js
const User = require('../models/User');
const { generateToken, validateEmailFormat, validatePasswordStrength } = require('../middleware/auth');

const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validate inputs
    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Username, email, and password are required',
      });
    }

    if (!validateEmailFormat(email)) {
      return res.status(400).json({
        error: 'Invalid email format',
      });
    }

    if (!validatePasswordStrength(password)) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: 'Passwords do not match',
      });
    }

    if (username.length < 3 || username.length > 50) {
      return res.status(400).json({
        error: 'Username must be between 3 and 50 characters',
      });
    }

    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        error: 'Email already registered',
      });
    }

    // Create user
    const userId = await User.create(username, email, password);
    const token = generateToken(userId);

    res.status(201).json({
      message: 'User registered successfully',
      userId,
      token,
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({
      error: 'Failed to register user',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
      });
    }

    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    // Verify password
    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    // Generate token
    const token = generateToken(user.id);
    
    // Update last login
    await User.updateLastLogin(user.id);

    res.json({
      message: 'Login successful',
      userId: user.id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      error: 'Failed to login',
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.created_at,
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({
      error: 'Failed to fetch profile',
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({
        error: 'Username and email are required',
      });
    }

    if (!validateEmailFormat(email)) {
      return res.status(400).json({
        error: 'Invalid email format',
      });
    }

    // Check if email is already in use
    const existingUser = await User.findByEmail(email);
    if (existingUser && existingUser.id !== userId) {
      return res.status(409).json({
        error: 'Email already in use',
      });
    }

    res.json({
      message: 'Profile updated successfully',
      userId,
      username,
      email,
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({
      error: 'Failed to update profile',
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        error: 'All password fields are required',
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        error: 'New passwords do not match',
      });
    }

    if (!validatePasswordStrength(newPassword)) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters',
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    const isPasswordValid = await User.verifyPassword(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Current password is incorrect',
      });
    }

    res.json({
      message: 'Password changed successfully',
    });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({
      error: 'Failed to change password',
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.userId;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        error: 'Password is required to delete account',
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Password is incorrect',
      });
    }

    await User.deleteUser(userId);

    res.json({
      message: 'Account deleted successfully',
    });
  } catch (err) {
    console.error('Delete account error:', err);
    res.status(500).json({
      error: 'Failed to delete account',
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
};
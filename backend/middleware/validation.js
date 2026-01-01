const validateAlbumInput = (req, res, next) => {
  const { title, description } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({
      error: 'Album title is required and must be a non-empty string',
    });
  }

  if (title.length > 100) {
    return res.status(400).json({
      error: 'Album title must be 100 characters or less',
    });
  }

  if (description && typeof description !== 'string') {
    return res.status(400).json({
      error: 'Description must be a string',
    });
  }

  if (description && description.length > 500) {
    return res.status(400).json({
      error: 'Description must be 500 characters or less',
    });
  }

  next();
};

const validateUserInput = (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate username
  if (!username || typeof username !== 'string') {
    return res.status(400).json({
      error: 'Username is required and must be a string',
    });
  }

  if (username.length < 3 || username.length > 50) {
    return res.status(400).json({
      error: 'Username must be between 3 and 50 characters',
    });
  }

  // Validate email
  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      error: 'Email is required and must be a string',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Invalid email format',
    });
  }

  // Validate password
  if (!password || typeof password !== 'string') {
    return res.status(400).json({
      error: 'Password is required and must be a string',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: 'Password must be at least 6 characters',
    });
  }

  next();
};

const validatePhotoIdParam = (req, res, next) => {
  const { photoId, albumId } = req.params;

  if (!photoId || isNaN(photoId)) {
    return res.status(400).json({
      error: 'Valid photo ID is required',
    });
  }

  if (albumId && isNaN(albumId)) {
    return res.status(400).json({
      error: 'Valid album ID is required',
    });
  }

  next();
};

module.exports = {
  validateAlbumInput,
  validateUserInput,
  validatePhotoIdParam,
};
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Multer file upload errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File size exceeds 10MB limit',
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        error: 'Too many files. Maximum 50 files allowed',
      });
    }
  }

  // Custom file validation errors
  if (err.message && err.message.includes('Only image files')) {
    return res.status(400).json({
      error: err.message,
    });
  }

  // Database errors
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      error: 'Email or username already exists',
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(403).json({
      error: 'Invalid token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(403).json({
      error: 'Token has expired',
    });
  }

  // Default error response
  res.status(500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server error',
  });
};

module.exports = errorHandler;
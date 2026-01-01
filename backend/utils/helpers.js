const crypto = require('crypto');
const moment = require('moment');

const generateUniqueFilename = (originalName) => {
  const ext = originalName.split('.').pop();
  const timestamp = Date.now();
  const random = crypto.randomBytes(4).toString('hex');
  return `${timestamp}_${random}.${ext}`;
};

const formatPhotoDate = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

const groupPhotosByDate = (photos) => {
  const grouped = {};
  photos.forEach(photo => {
    const date = moment(photo.uploaded_at).format('YYYY-MM-DD');
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(photo);
  });
  return grouped;
};

const calculateFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

module.exports = {
  generateUniqueFilename,
  formatPhotoDate,
  groupPhotosByDate,
  calculateFileSize,
};
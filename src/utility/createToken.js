const jwt = require('jsonwebtoken');

function createToekn(data) {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
}

module.exports = createToekn;

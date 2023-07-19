const jwt = require('jsonwebtoken');

function authVerifyMiddleware(req, res, next) {
  const { token } = req.headers;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ status: 'Authentication failure!' });
    } else {
      req.headers.user = decoded;
      next();
    }
  });
}

module.exports = authVerifyMiddleware;

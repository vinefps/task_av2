const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = verified; // O `verified` deve conter o campo `id` do usuário
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token.' });
  }
};

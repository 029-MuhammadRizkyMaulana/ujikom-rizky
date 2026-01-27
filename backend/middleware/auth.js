const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'secret_key_ujikom');
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Akses Ditolak! Anda harus login." });
  }
};
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { email, password } = req.body;

  console.log("Data Login Masuk:", email, password);

  if (email === 'admin@mail.com' && password === 'admin123') {
    const token = jwt.sign(
      { role: 'admin' }, 
      'secret_key_ujikom',
      { expiresIn: '1d' }
    );
    
    return res.status(200).json({
      message: "Login Berhasil!",
      token: token
    });
  } else {
    return res.status(401).json({ message: "Email atau Password Salah!" });
  }
};
const RegisterModel = require('../models/modelregister');
const db = require('../db');

exports.showRegisterForm = (req, res) => {
  res.render('register', { successMessage: res.locals.successMessage });
};

exports.registerUser = (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
    no_telepon: req.body.no_telepon,
    email: req.body.email,
    role: 'user', // Default role: user
  };

  RegisterModel.registerUser(userData, (err, userId) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.status(500).send('Internal Server Error');
    }

    console.log('User registered successfully with ID:', userId);

    // Setelah registrasi sukses, atur sesi pengguna
    req.session.loggedin = true;
    req.session.email = req.body.email;

    // Query untuk mendapatkan id_user
    const query = 'SELECT id_user FROM tbl_login WHERE email = ?';
    db.query(query, [req.session.email], (err, results) => {
      if (err) throw err;

      // Setelah mendapatkan id_user, bisa disimpan di sesi atau digunakan sesuai kebutuhan
      req.session.id_user = results[0].id_user;

      // Redirect langsung ke /user/index
      res.redirect('/user/index');
    });
  });
};

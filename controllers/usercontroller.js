const UserModel = require('../models/usermodel'); // Pastikan path sesuai dengan struktur direktori Anda

exports.listUsers = (req, res) => {
  UserModel.getAll((err, users) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.render('admin/users/index', { users });
  });
};


exports.addUserForm = (req, res) => {
  res.render('admin/users/tambah'); // Menampilkan formulir tambah user
};

exports.createUser = (req, res) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    no_telepon: req.body.no_telepon,
    email: req.body.email,
    role: req.body.role,
  };

  UserModel.create(newUser, (err, insertId) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.redirect('/users');
  });
};

exports.editUserForm = (req, res) => {
  const { id_user } = req.params;
  UserModel.getById(id_user, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.render('admin/users/edit', { user });
  });
};

exports.updateUser = (req, res) => {
  const { id_user } = req.params;
  const updatedUser = {
    username: req.body.username,
    password: req.body.password,
    no_telepon: req.body.no_telepon,
    email: req.body.email,
    role: req.body.role,
  };

  UserModel.update(id_user, updatedUser, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.redirect('/users');
  });
};

exports.deleteUser = (req, res) => {
  const { id_user } = req.params;
  UserModel.delete(id_user, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Pengguna berhasil dihapus');
    res.sendStatus(200); // Kirim status sukses (OK) kembali ke klien
  });
};

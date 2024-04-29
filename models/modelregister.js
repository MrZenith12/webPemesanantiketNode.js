const db = require('../db');

class RegisterModel {
  static registerUser(userData, callback) {
    const { username, password, no_telepon, email, role } = userData;
    const query = 'INSERT INTO tbl_login (username, password, no_telepon, email, role) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [username, password, no_telepon, email, role], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.insertId);
    });
  }

  // Jika Anda memerlukan fungsi lain terkait registrasi, Anda dapat menambahkannya di sini
}

module.exports = RegisterModel;

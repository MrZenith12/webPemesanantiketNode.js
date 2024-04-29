const db = require('../db');

class User {
  static getAll(callback) {
    db.query('SELECT * FROM tbl_login', (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }

  static getById(id_user, callback) {
    db.query('SELECT * FROM tbl_login WHERE id_user = ?', [id_user], (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows[0]);
    });
  }

  static create(newUser, callback) {
    db.query('INSERT INTO tbl_login (username, password, no_telepon, email, role) VALUES (?, ?, ?, ?, ?)',
      [newUser.username, newUser.password, newUser.no_telepon, newUser.email, newUser.role],
      (err, result) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, result.insertId);
      });
  }

  static update(id_user, updatedUser, callback) {
    const query = 'UPDATE tbl_login SET username = ?, password = ?, no_telepon = ?, email = ?, role = ? WHERE id_user = ?';

    db.query(query, [updatedUser.username, updatedUser.password, updatedUser.no_telepon, updatedUser.email, updatedUser.role, id_user], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.affectedRows);
    });
  }

  static delete(id_user, callback) {
    db.query('DELETE FROM tbl_login WHERE id_user = ?', [id_user], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.affectedRows);
    });
  }
}

module.exports = User;

const db = require('../db');
const fs = require('fs');
const path = require('path');

class Penginapan {
  static getAll(callback) {
    db.query('SELECT * FROM tbl_penginapan', (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }

  static favorit(callback) {
    db.query('SELECT * FROM tbl_penginapan LIMIT 1', (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }

  static getGambarById(id_penginapan, callback) {
    const query = 'SELECT gambar_penginapan FROM tbl_penginapan WHERE id_penginapan = ?';

    db.query(query, [id_penginapan], (err, result) => {
      if (err) {
        return callback(err, null);
      }

      if (result.length === 1) {
        const imageName = result[0].gambar_penginapan;
        const imagePath = path.join(__dirname, '../gambar/penginapan', imageName);

        fs.readFile(imagePath, (error, data) => {
          if (error) {
            return callback(error, null);
          }

          return callback(null, data);
        });
      } else {
        return callback(null, null);
      }
    });
  }

  static getById(id_penginapan) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_penginapan WHERE id_penginapan = ?', [id_penginapan], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows[0]);
      });
    });
  }  

  static getidpenginapan(id_penginapan, callback) {
    db.query('SELECT * FROM tbl_penginapan WHERE id_penginapan = ?', [id_penginapan], (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, rows[0]);
    });
  }

  static create(newPenginapan, callback) {
    db.query('INSERT INTO tbl_penginapan (kode_penginapan, nama_penginapan, deskripsi_penginapan, sisa_penginapan, gambar_penginapan, harga_penginapan, fasilitas_penginapan) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [newPenginapan.kode_penginapan, newPenginapan.nama_penginapan, newPenginapan.deskripsi_penginapan, newPenginapan.sisa_penginapan, newPenginapan.gambar_penginapan, newPenginapan.harga_penginapan, newPenginapan.fasilitas_penginapan],
      (err, result) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, result.insertId);
      });
  }

  static update(id_penginapan, updatedPenginapan, callback) {
    const query = 'UPDATE tbl_penginapan SET nama_penginapan = ?, deskripsi_penginapan = ?, sisa_penginapan = ?, harga_penginapan = ?, fasilitas_penginapan = ? WHERE id_penginapan = ?';

    db.query(query, [updatedPenginapan.nama_penginapan, updatedPenginapan.deskripsi_penginapan, updatedPenginapan.sisa_penginapan,  updatedPenginapan.harga_penginapan, updatedPenginapan.fasilitas_penginapan, id_penginapan], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, result.affectedRows);
    });
  }

  static updategambar(id_penginapan, updatedPenginapan, callback) {
    const query = 'UPDATE tbl_penginapan SET nama_penginapan = ?, deskripsi_penginapan = ?, sisa_penginapan = ?, gambar_penginapan = ?, harga_penginapan = ?, fasilitas_penginapan = ? WHERE id_penginapan = ?';

    db.query(query, [updatedPenginapan.nama_penginapan, updatedPenginapan.deskripsi_penginapan, updatedPenginapan.sisa_penginapan, updatedPenginapan.gambar_penginapan, updatedPenginapan.harga_penginapan, updatedPenginapan.fasilitas_penginapan, id_penginapan], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, result.affectedRows);
    });
  }

  static delete(id_penginapan, callback) {
    db.query('DELETE FROM tbl_penginapan WHERE id_penginapan = ?', [id_penginapan], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.affectedRows);
    });
  }
}

module.exports = Penginapan;

const db = require('../db');
const fs = require('fs');
const path = require('path');

class Paket {
  static getAll(callback) {
    const query = `
      SELECT p.*, d.nama_destinasi
      FROM tbl_paket p
      JOIN tbl_destinasi d ON p.id_destinasi = d.id_destinasi
    `;
  
    db.query(query, (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }

  static favorit(callback) {
    db.query('SELECT * FROM tbl_paket LIMIT 3', (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }

  static getGambarById(new_id_pakettour, callback) {
    const query = 'SELECT gambar_paket FROM tbl_paket WHERE new_id_pakettour = ?';

    db.query(query, [new_id_pakettour], (err, result) => {
      if (err) {
        return callback(err, null);
      }

      if (result.length === 1) {
        const imageName = result[0].gambar_paket;
        const imagePath = path.join(__dirname, '../gambar/paket', imageName);

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

  static getById(new_id_pakettour) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_paket WHERE new_id_pakettour = ?', [new_id_pakettour], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows[0]);
      });
    });
  }  

  static getid(new_id_pakettour, callback) {
    db.query('SELECT * FROM tbl_paket WHERE new_id_pakettour = ?', [new_id_pakettour], (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, rows[0]);
    });
  }

  static create(newPaket, callback) {
    db.query('INSERT INTO tbl_paket (kode_paket, namapaket, id_destinasi, deskripsi_paket, sisa_paket, gambar_paket, harga_paket) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [newPaket.kode_paket, newPaket.namapaket, newPaket.id_destinasi, newPaket.deskripsi_paket, newPaket.sisa_paket, newPaket.gambar_paket, newPaket.harga_paket],
      (err, result) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, result.insertId);
      });
    }

  static update(new_id_pakettour, updatedPaket, callback) {
    const query = 'UPDATE tbl_paket SET nama_paket = ?, deskripsi_paket = ?, sisa_paket = ?, harga_paket = ? WHERE new_id_pakettour = ?';

    db.query(query, [updatedPaket.nama_paket, updatedPaket.deskripsi_paket, updatedPaket.sisa_paket,  updatedPaket.harga_paket, new_id_pakettour], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, result.affectedRows);
    });
  }

  static updategambar(new_id_pakettour, updatedPaket, callback) {
    const query = 'UPDATE tbl_paket SET nama_paket = ?, deskripsi_paket = ?, sisa_paket = ?, gambar_paket = ?, harga_paket = ? WHERE new_id_pakettour = ?';

    db.query(query, [updatedPaket.nama_paket, updatedPaket.deskripsi_paket, updatedPaket.sisa_paket, updatedPaket.gambar_paket, updatedPaket.harga_paket, new_id_pakettour], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, result.affectedRows);
    });
  }

  static delete(new_id_pakettour, callback) {
    db.query('DELETE FROM tbl_paket WHERE new_id_pakettour = ?', [new_id_pakettour], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.affectedRows);
    });
  }
}

module.exports = Paket;

const db = require('../db');
const fs = require('fs');
const path = require('path');

class Destinasi {
  static getAll(callback) {
    const query = `
      SELECT d.*, p.nama_penginapan
      FROM tbl_destinasi d
      JOIN tbl_penginapan p ON d.id_penginapan = p.id_penginapan
    `;
  
    db.query(query, (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }
  

  static favorit(callback) {
    db.query('SELECT * FROM tbl_destinasi LIMIT 1', (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }

  static getGambarById(id_destinasi, callback) {
    const query = 'SELECT gambar_produk FROM tbl_destinasi WHERE id_destinasi = ?';

    db.query(query, [id_destinasi], (err, result) => {
      if (err) {
        return callback(err, null);
      }

      if (result.length === 1) {
        const imageName = result[0].gambar_produk;
        const imagePath = path.join(__dirname, '../gambar', imageName);

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

  static async getById(id_destinasi) {
    const query = 'SELECT * FROM tbl_destinasi WHERE id_destinasi = ?';

    try {
      const [rows, fields] = await db.promise().query(query, [id_destinasi]);

      if (rows.length === 1) {
        return rows[0];
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  static getid(id_destinasi, callback) {
    db.query('SELECT * FROM tbl_destinasi WHERE id_destinasi = ?', [id_destinasi], (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, rows[0]);
    });
  }

  static create(newDestinasi, callback) {
    db.query(
      'INSERT INTO tbl_destinasi (kode_destinasi, id_penginapan, nama_destinasi, deskripsi, sisa_destinasi, gambar_produk, harga) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [newDestinasi.kode_destinasi, newDestinasi.id_penginapan, newDestinasi.nama_destinasi, newDestinasi.deskripsi, newDestinasi.sisa_destinasi, newDestinasi.gambar_produk, newDestinasi.harga],
      (err, result) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, result.insertId);
      }
    );
  }
  

  // Fungsi update
static update(id_destinasi, updatedDestinasi, callback) {
  const query = 'UPDATE tbl_destinasi SET  id_penginapan = ?, nama_destinasi = ?, deskripsi = ?, sisa_destinasi = ?, harga = ? WHERE id_destinasi = ?';

  db.query(query, [ updatedDestinasi.id_penginapan, updatedDestinasi.nama_destinasi, updatedDestinasi.deskripsi, updatedDestinasi.sisa_destinasi,  updatedDestinasi.harga, id_destinasi], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result.affectedRows);
  });
}

// Fungsi updategambar
static updategambar(id_destinasi, updatedDestinasi, callback) {
  const query = 'UPDATE tbl_destinasi SET  id_penginapan = ?, nama_destinasi = ?, deskripsi = ?, sisa_destinasi = ?, gambar_produk = ?, harga = ?, fasilitas_penginapan = ? WHERE id_destinasi = ?';

  db.query(query, [ updatedDestinasi.id_penginapan, updatedDestinasi.nama_destinasi, updatedDestinasi.deskripsi, updatedDestinasi.sisa_destinasi, updatedDestinasi.gambar_produk, updatedDestinasi.harga, id_destinasi], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result.affectedRows);
  });
}

  static delete(id_destinasi, callback) {
    db.query('DELETE FROM tbl_destinasi WHERE id_destinasi = ?', [id_destinasi], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.affectedRows);
    });
  }
}

module.exports = Destinasi;

const db = require('../db');
const fs = require('fs');
const path = require('path');

class Destinasi {
  static getAll(callback) {
    db.query('SELECT * FROM tbl_pespenginapan', (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }

  static async getById(id_pesnip) {
    const query = 'SELECT * FROM tbl_pespenginapan WHERE id_pesnip = ?';

    try {
      const [rows, fields] = await db.promise().query(query, [id_pesnip]);

      if (rows.length === 1) {
        return rows[0];
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  static update(id_pesnip, updatedDestinasi, callback) {
    const query = 'UPDATE tbl_pesandes SET nama = ?, email = ?, alamat = ?, no_telepon = ?, harga = ?, nama_penginapan = ?, jumlah_orang = ?, tgl_pergi = ?, tgl_pulang = ?, bank = ?, no_rek = ?, total_harga = ? WHERE id_pesandes = ?';

    db.query(query,
      [updatedPembayaran.nama, updatedPembayaran.email, updatedPembayaran.alamat, updatedPembayaran.no_telepon, updatedPembayaran.harga, updatedPembayaran.nama_penginapan, updatedPembayaran.jumlah_orang, updatedPembayaran.tgl_pergi, updatedPembayaran.tgl_pulang, updatedPembayaran.bank, updatedPembayaran.no_rek, updatedPembayaran.total_harga, id_pesandes],
      (err, result) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, result.affectedRows);
      });
  }

  static delete(id_pesnip, callback) {
    db.query('DELETE FROM tbl_pespenginapan WHERE id_pesnip = ?', [id_pesnip], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.affectedRows);
    });
  }
}

module.exports = Destinasi;

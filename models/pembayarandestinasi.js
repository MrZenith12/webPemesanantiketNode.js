const db = require('../db');

class PembayaranDestinasi {
  static getAll(callback) {
    db.query('SELECT * FROM tbl_pesandes', (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }

  static getById(id_pesdes, callback) {
    db.query('SELECT * FROM tbl_pesandes WHERE id_pesdes = ?', [id_pesdes], (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows[0]);
    });
  }
  

  static update(id_pesdes, updatedPembayaran, callback) {
    db.query('UPDATE tbl_pesandes SET nama = ?, email = ?, alamat = ?, no_telepon = ?, harga = ?, nama_destinasi = ?, jumlah_orang = ?, tgl_pergi = ?, tgl_pulang = ?, bank = ?, no_rek = ?, total_harga = ? WHERE id_pesdes = ?',
      [updatedPembayaran.nama, updatedPembayaran.email, updatedPembayaran.alamat, updatedPembayaran.no_telepon, updatedPembayaran.harga, updatedPembayaran.nama_destinasi, updatedPembayaran.jumlah_orang, updatedPembayaran.tgl_pergi, updatedPembayaran.tgl_pulang, updatedPembayaran.bank, updatedPembayaran.no_rek, updatedPembayaran.total_harga, id_pesdes],
      (err, result) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, result.affectedRows);
      });
  }

  static delete(id_pesdes, callback) {
    db.query('DELETE FROM tbl_pesandes WHERE id_pesdes = ?', [id_pesdes], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.affectedRows);
    });
  }
}

module.exports = PembayaranDestinasi;

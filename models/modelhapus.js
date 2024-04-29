// models/daftarpesanan.js

const db = require('../db');
const path = require('path');
const fs = require('fs');

class DaftarPesanan {
  static allPesanan(id_user, callback) {
    const query = 'SELECT * FROM  tbl_pesandes WHERE id_user = ?';

    db.query(query, [id_user], (errDaftarPesanan, daftarPesanan) => {
      if (errDaftarPesanan) {
        return callback(errDaftarPesanan, null);
      }

      const listPesanan = daftarPesanan;
      return callback(null, listPesanan);
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

  static allPesananPenginapan(id_user, callback) {
    const query = 'SELECT * FROM  tbl_pespenginapan WHERE id_user = ?';

    db.query(query, [id_user], (errDaftarPenginapan, daftarPenginapan) => {
      if (errDaftarPenginapan) {
        return callback(errDaftarPenginapan, null);
      }

      const listPenginapan = daftarPenginapan;
      return callback(null, listPenginapan);
    });
  }

  static getGambarByIdPenginapan(id_penginapan, callback) {
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

  static allPesananPaket(id_user, callback) {
    const query = 'SELECT * FROM  tbl_pespaket WHERE id_user = ?';

    db.query(query, [id_user], (errDaftarPaket, daftarPaket) => {
      if (errDaftarPaket) {
        return callback(errDaftarPaket, null);
      }

      const listPaket = daftarPaket;
      return callback(null, listPaket);
    });
  }

  static getGambarByIdPaket(new_id_pakettour, callback) {
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

  

  static cancelPesanan(id_pesandes, callback) {
    const query = 'DELETE FROM tbl_pesandes WHERE id_pesandes = ?';
    db.query(query, [id_pesandes], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }

  static cancelPesananPenginapan(id_pespenginapan, callback) {
    const query = 'DELETE FROM tbl_pespenginapan WHERE id_pespenginapan = ?';
    db.query(query, [id_pespenginapan], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }

}

module.exports = DaftarPesanan;
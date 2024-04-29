// pemesananmodel.js
const db = require('../db');

module.exports = {
  addPemesanan: (dataPemesanan, callback) => {
    const query = 'INSERT INTO tbl_pesandes SET ?';
    db.query(query, dataPemesanan, (error, results) => {
      if (error) {
        callback({ success: false, error });
      } else {
        callback({ success: true, results });
      }
    });
  },

  kurangiStokDestinasi: (namaDestinasi, jumlahPesan, callback) => {
    const query = 'UPDATE tbl_destinasi SET sisa_destinasi = sisa_destinasi - ? WHERE nama_destinasi = ?';
    db.query(query, [jumlahPesan, namaDestinasi], (error, results) => {
      if (error) {
        callback({ success: false, error });
      } else {
        callback({ success: true, results });
      }
    });
  },

  addPemesananPenginapan: (dataPemesanan, callback) => {
    const query = 'INSERT INTO tbl_pespenginapan SET ?';
    db.query(query, dataPemesanan, (error, results) => {
      if (error) {
        callback({ success: false, error });
      } else {
        callback({ success: true, results });
      }
    });
  },

  kurangiStokPenginapan: (namaPenginapan, jumlahPesan, callback) => {
    const query = 'UPDATE tbl_penginapan SET sisa_penginapan = sisa_penginapan - ? WHERE nama_penginapan = ?';
    db.query(query, [jumlahPesan, namaPenginapan], (error, results) => {
      if (error) {
        callback({ success: false, error });
      } else {
        callback({ success: true, results });
      }
    });
  },

  addPemesananPaket: (dataPemesanan, callback) => {
    const query = 'INSERT INTO tbl_pespaket SET ?';
    db.query(query, dataPemesanan, (error, results) => {
      if (error) {
        callback({ success: false, error });
      } else {
        callback({ success: true, results });
      }
    });
  },

  kurangiStokPaket: (namaPaket, jumlahPesan, callback) => {
    const query = 'UPDATE tbl_paket SET sisa_paket = sisa_paket - ? WHERE namapaket = ?';
    db.query(query, [jumlahPesan, namaPaket], (error, results) => {
      if (error) {
        callback({ success: false, error });
      } else {
        callback({ success: true, results });
      }
    });
  },
};

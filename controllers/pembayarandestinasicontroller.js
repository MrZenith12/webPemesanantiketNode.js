const PembayaranDestinasi = require('../models/pembayarandestinasi');
const path = require('path');
const fs = require('fs');

exports.listPembayaranDestinasi = (req, res) => {
    PembayaranDestinasi.getAll((err, pembayaranDestinasi) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.render('admin/pembayarandestinasi/index', { pembayaranDestinasi });
    });
  };  


  exports.editDestinasiForm = (req, res) => {
    const { id_pesdes } = req.params;
    PembayaranDestinasi.getById(id_pesdes, (err, pembayaranDestinasi) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.render('admin/pembayarandestinasi/edit', { pembayaranDestinasi });
    });
  };  

exports.updatePembayaranDestinasi = (req, res) => {
    const { id_pesdes } = req.params;
    const updatedPembayaran = {
      id_user: req.body.id_user,
      nama: req.body.nama,
      email: req.body.email,
      alamat: req.body.alamat,
      no_telepon: req.body.no_telepon,
      harga: req.body.harga,
      nama_destinasi: req.body.nama_destinasi,
      jumlah_orang: req.body.jumlah_orang,
      tgl_pergi: req.body.tgl_pergi,
      tgl_pulang: req.body.tgl_pulang,
      bank: req.body.bank,
      no_rek: req.body.no_rek,
      total_harga: req.body.total_harga,
    };
  
    PembayaranDestinasi.update(id_pesdes, updatedPembayaran, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.redirect('/pembayarandestinasi');
    });
  };

exports.deletePembayaranDestinasi = (req, res) => {
  const { id_pesdes } = req.params;
  PembayaranDestinasi.delete(id_pesdes, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('Pembayaran destinasi berhasil dihapus');
    res.sendStatus(200);
  });
};
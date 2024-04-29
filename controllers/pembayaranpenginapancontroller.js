const penginapanmodel = require('../models/pembayaranpenginapanmodel'); // Assuming your model is named penginapanmodel
const path = require('path');
const fs = require('fs');

exports.listPenginapan = (req, res) => {
  penginapanmodel.getAll((err, penginapan) => {
    if (err) throw err;
    res.render('admin/pembayaranpenginapan/index', { penginapan });
  });
};

exports.editPenginapanForm = (req, res) => {
    const { id_pespenginapan } = req.params;
    console.log('ID Pespenginapan:', id_pespenginapan);
  
    penginapanmodel.getById(id_pespenginapan, (err, penginapan) => {
        if (err) throw err;
        res.render('admin/pembayaranpenginapan/edit', { penginapan });
      });
  };

exports.updatePenginapan = (req, res) => {
  const { id_pespenginapan } = req.params;
  const updatedPenginapan = {
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

  console.log('Data yang diterima:', updatedPenginapan);

  if (req.file) {
    updatedPenginapan.gambar_paket = req.file.filename;
    penginapanmodel.updategambar(id_pespenginapan, updatedPenginapan, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.redirect('/destinasi');
    });
  } else {
    penginapanmodel.update(id_pespenginapan, updatedPenginapan, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.redirect('/destinasi');
    });
  }
};

exports.deletePenginapan = (req, res) => {
  const { id_pespenginapan } = req.params;
  penginapanmodel.delete(id_pespenginapan, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Paket berhasil dihapus');
    res.sendStatus(200);
  });
};

const penginapanmodel = require('../models/penginapanmodel'); // Assuming your model is named penginapanmodel
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const lodash = require('lodash');

exports.listPenginapan = (req, res) => {
  penginapanmodel.getAll((err, penginapan) => {
    if (err) throw err;
    res.render('admin/penginapan/index', { penginapan });
  });
};
  
exports.userAllPenginapan = (req, res) => {
  const username = req.session.username;

  penginapanmodel.getAll((err, penginapan) => {
    if (err) throw err;
    res.render('user/penginapan', { penginapan, username });
  });
};

exports.rekomend = (req, res) => {
  penginapanmodel.getAll((err, penginapan) => {
    if (err) throw err;
    res.render('daftarpesanan', { penginapan });
  });
};

exports.allPenginapan = (req, res) => {
  penginapanmodel.getAll((err, penginapan) => {
    if (err) throw err;
    res.render('penginapan', { penginapan });
  });
};

exports.getAllPenginapan = (req, res) => {
  penginapanmodel.getAll((err, penginapan) => {
    if (err) throw err;
    res.render('index', { penginapan });
  });
};

exports.getGambarPenginapan = (req, res) => {
  const id_penginapan = req.params.id_penginapan;

  penginapanmodel.getGambarById(id_penginapan, (err, data) => {
    if (err) {
      res.status(500).send('Gagal membaca gambar');
    } else {
      if (data) {
        res.setHeader('Content-Type', 'image/png');
        res.end(data);
      } else {
        res.status(404).send('Gambar tidak ditemukan');
      }
    }
  });
};

exports.tambahPenginapanForm = (req, res) => {
  res.render('admin/penginapan/tambah');
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'gambar/penginapan/'); // Direktori tujuan untuk menyimpan file gambar_paket
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.createPenginapan = (req, res) => {
  // Menggunakan middleware Multer untuk menangani pengunggahan file
  upload.single('gambar_penginapan')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading file', details: err.message });
    }

    const newPenginapan = {
      kode_penginapan: req.body.kode_penginapan,
      nama_penginapan: req.body.nama_penginapan,
      deskripsi_penginapan: req.body.deskripsi_penginapan,
      sisa_penginapan: req.body.sisa_penginapan,
      harga_penginapan: req.body.harga_penginapan,
      fasilitas_penginapan: req.body.fasilitas_penginapan,
      gambar_penginapan: req.file ? req.file.filename : null,
    };

    penginapanmodel.create(newPenginapan, (err, insertId) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating penginapan', details: err.message });
      }

      res.redirect('/penginapan');
    });
  });
};

exports.editPenginapanForm = (req, res) => {
  const { id_penginapan } = req.params;
  penginapanmodel.getidpenginapan(id_penginapan, (err, penginapan) => {
    if (err) throw err;
    res.render('admin/penginapan/edit', { penginapan });
  });
};

exports.updatePenginapan = (req, res) => {
  const { id_penginapan } = req.params;
  const updatedPenginapan = {
    kode_penginapan: req.body.nama_penginapan,
    nama_penginapan: req.body.nama_penginapan,
    deskripsi_penginapan: req.body.deskripsi_penginapan,
    sisa_penginapan: req.body.sisa_penginapan,
    harga_penginapan: req.body.harga_penginapan,
    fasilitas_penginapan: req.body.fasilitas_penginapan,
  };

  console.log('Data yang diterima:', updatedPenginapan);

  if (req.file) {
    updatedPenginapan.gambar_paket = req.file.filename;
    penginapanmodel.updategambar(id_penginapan, updatedPenginapan, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.redirect('/penginapan');
    });
  } else {
    penginapanmodel.update(id_penginapan, updatedPenginapan, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.redirect('/penginapan');
    });
  }
};

exports.updatePenginapan = (req, res) => {
  const { id_penginapan } = req.params;
  const updatedPenginapan = lodash.cloneDeep(req.body);

  console.log('Data yang diterima:', updatedPenginapan);

  if (req.file) {
    updatedPenginapan.gambar_paket = req.file.filename;
    penginapanmodel.updategambar(id_penginapan, updatedPenginapan, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.redirect('/penginapan');
    });
  } else {
    penginapanmodel.update(id_penginapan, updatedPenginapan, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.redirect('/penginapan');
    });
  }
};

exports.deletePenginapan = (req, res) => {
  const { id_penginapan } = req.params;
  penginapanmodel.delete(id_penginapan, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Paket berhasil dihapus');
    res.sendStatus(200);
  });
};

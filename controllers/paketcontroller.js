const paketmodel = require('../models/paketmodel'); 
const destinasimodel = require('../models/destinasimodel'); 
const path = require('path');
const fs = require('fs');
const multer = require('multer');

exports.listPaket = (req, res) => {
  paketmodel.getAll((err, paket) => {
    if (err) throw err;
    res.render('admin/paket/index', { paket });
  });
};

exports.paketPaket = (req, res) => {
  paketmodel.getAll((err, paket) => {
    if (err) throw err;
    res.render('index', { paket });
  });
};

exports.allPaket = (req, res) => {
  paketmodel.getAll((err, paket) => {
    if (err) throw err;
    res.render('paket', { paket });
  });
};

exports.userAllPaket = (req, res) => {
  const username = req.session.username;

  paketmodel.getAll((err, paket) => {
    if (err) throw err;
    res.render('user/paket', { paket, username });
  });
};

exports.rekomend = (req, res) => {
  paketmodel.getAll((err, paket) => {
    if (err) throw err;
    res.render('daftarpesanan', { paket });
  });
};

exports.getGambarPaket = (req, res) => {
  const new_id_pakettour = req.params.new_id_pakettour;

  paketmodel.getGambarById(new_id_pakettour, (err, data) => {
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

exports.tambahPaketForm = (req, res) => {
  // ambil data destinasi untuk select box
  destinasimodel.getAll((err, destinasi) => {
    if(err) {
      return res.status(500).json({ error: err.message });
    }

    res.render('admin/paket/tambah', { destinasi: destinasi || [] });
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'gambar/paket/'); // Direktori tujuan untuk menyimpan file gambar_paket
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.createPaket = (req, res) => {
  // Menggunakan middleware Multer untuk menangani pengunggahan file
  upload.single('gambar_paket')(req, res, (err) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }

      // Proses data lainnya
      const newPaket = {
          kode_paket: req.body.kode_paket,
          namapaket: req.body.namapaket,
          id_destinasi: req.body.id_destinasi,
          deskripsi_paket: req.body.deskripsi_paket,
          sisa_paket: req.body.sisa_paket,
          harga_paket: req.body.harga_paket,
          gambar_paket: req.file ? req.file.filename : null,
      };

      // Lanjutkan dengan menyimpan data ke database
      paketmodel.create(newPaket, (err, insertId) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }

          res.redirect('/paket');
      });
  });
};

exports.editPaketForm = (req, res) => {
  const { new_id_pakettour } = req.params;
  paketmodel.getById(new_id_pakettour, (err, paket) => {
    if (err) throw err;
    res.render('admin/paket/edit', { paket });
  });
};

exports.updatePaket = (req, res) => {
  const { new_id_pakettour } = req.params;
  const updatedPaket = {
    nama_paket: req.body.nama_paket,
    deskripsi_paket: req.body.deskripsi_paket,
    sisa_paket: req.body.sisa_paket,
    harga_paket: req.body.harga_paket,
  };

  console.log('Data yang diterima:', updatedPaket);

  if (req.file) {
    updatedPaket.gambar_paket = req.file.filename;
    paketmodel.updategambar(new_id_pakettour, updatedPaket, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.redirect('/paket');
    });
  } else {
    paketmodel.update(new_id_pakettour, updatedPaket, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.redirect('/paket');
    });
  }
};

exports.deletePaket = (req, res) => {
  const { new_id_pakettour } = req.params;
  paketmodel.delete(new_id_pakettour, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Paket berhasil dihapus');
    res.sendStatus(200);
  });
};

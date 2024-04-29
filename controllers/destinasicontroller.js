const destinasimodel = require('../models/destinasimodel'); 
const penginapanModel = require('../models/penginapanmodel'); 
const path = require('path');
const fs = require('fs');
const multer = require('multer');

exports.listDestinasi = (req, res) => {
  destinasimodel.getAll((err, destinasi) => {
    if (err) throw err;
    res.render('admin/destinasi/index', { destinasi });
  });
};

exports.allDestinasi = (req, res) => {
  destinasimodel.getAll((err, destinasi) => {
    if (err) throw err;
    res.render('destinasi', { destinasi }); // Ganti 'destinasi' dengan nama file ejs yang sesuai dengan halaman depan Anda
  });
};

exports.getAllDestinasi = (req, res) => {
  destinasimodel.getAll((err, destinasi) => {
    if (err) throw err;

    // Urutkan destinasi berdasarkan timestamp (ganti dengan properti yang sesuai)
    destinasi.sort((a, b) => b.timestamp - a.timestamp);

    // Batasi hanya menampilkan empat destinasi terbaru
    const destinasiTerbaru = destinasi.slice(0, 4);

    res.render('index', { destinasi: destinasiTerbaru });
  });
};

exports.userAllDestinasi = (req, res) => {
  const username = req.session.username;

  destinasimodel.getAll((err, destinasi) => {
    if (err) throw err;

    // Batasi hanya menampilkan lima destinasi tanpa mempertimbangkan urutan atau timestamp
    const limaDestinasi = destinasi.slice(0, 4);

    res.render('user/index', { destinasi: limaDestinasi, username });
  });
};

exports.userAllDestinasides = (req, res) => {
  const username = req.session.username;

  destinasimodel.getAll((err, destinasi) => {
    if (err) throw err;

    res.render('user/destinasi', { destinasi, username });
  });
};

exports.rekomend = (req, res) => {
  destinasimodel.getAll((err, destinasi) => {
    if (err) throw err;
    res.render('daftarpesanan', { destinasi });
  });
};

exports.getGambarDestinasi = (req, res) => {
  const id_destinasi = req.params.id_destinasi;

  destinasimodel.getGambarById(id_destinasi, (err, data) => {
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

exports.tambahDestinasiForm = (req, res) => {
  // ambil data penginapan untuk select box
  penginapanModel.getAll((err, penginapan) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.render('admin/destinasi/tambah', { penginapan: penginapan || [] });
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'gambar/'); // Direktori tujuan untuk menyimpan file gambar_paket
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.createDestinasi = (req, res) => {
  // Menggunakan middleware Multer untuk menangani pengunggahan file
  upload.single('gambar_produk')(req, res, (err) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }

      // Proses data lainnya
      const newDestinasi = {
        kode_destinasi: req.body.kode_destinasi,
        nama_destinasi: req.body.nama_destinasi,
        id_penginapan: req.body.id_penginapan,
        deskripsi: req.body.deskripsi,
        sisa_destinasi: req.body.sisa_destinasi,
        harga: req.body.harga,
        gambar_produk: req.file ? req.file.filename : null,
      };

      // Lanjutkan dengan menyimpan data ke database
      destinasimodel.create(newDestinasi, (err, insertId) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }

          res.redirect('/destinasi');
      });
  });
};

exports.editDestinasiForm = (req, res) => {
  const { id_destinasi } = req.params;

  // Ambil data destinasi berdasarkan ID
  destinasimodel.getid(id_destinasi, (err, destinasi) => {
    if (err) {
      console.error('Error fetching destinasi:', err);
      throw err;
    }

    // Ambil data penginapan untuk select box
    penginapanModel.getAll((err, penginapan) => {
      if (err) {
        console.error('Error fetching penginapan:', err);
        return res.status(500).json({ error: err.message });
      }

      // Render halaman edit dengan data destinasi dan penginapan
      res.render('admin/destinasi/edit', { destinasi, penginapan: penginapan || [] });
    });
  });
};

exports.updateDestinasi = (req, res) => {
  const { id_destinasi } = req.params;
  const updatedDestinasi = {
    // kode_destinasi tidak dimasukkan ke dalam objek updatedDestinasi
    nama_destinasi: req.body.nama_destinasi,
    id_penginapan: req.body.id_penginapan,
    deskripsi: req.body.deskripsi,
    sisa_destinasi: req.body.sisa_destinasi,
    harga: req.body.harga,
  };

  console.log('Data yang diterima:', updatedDestinasi);

  if (req.file) {
    updatedDestinasi.gambar_produk = req.file.filename;
    destinasimodel.updategambar(id_destinasi, updatedDestinasi, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.redirect('/destinasi');
    });
  } else {
    destinasimodel.update(id_destinasi, updatedDestinasi, (err) => {
      if (err) {
        // Tambahkan penanganan kesalahan jika 'kode_destinasi' duplikat
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Kode destinasi sudah ada. Masukkan kode destinasi yang berbeda.' });
        }
        return res.status(500).json({ error: err.message });
      }

      res.redirect('/destinasi');
    });
  }
};



exports.deleteDestinasi = (req, res) => {
  const { id_destinasi } = req.params;
  destinasimodel.delete(id_destinasi, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Paket berhasil dihapus');
    res.sendStatus(200);
  });
};

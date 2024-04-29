const pemesananModel = require('../models/pemesananmodel');
const destinasimodel = require('../models/destinasimodel');
const penginapanmodel = require('../models/penginapanmodel');
const paketmodel = require('../models/paketmodel');

module.exports = {
  formPemesanan: async (req, res) => {
    try {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
      const id_destinasi = req.params.id_destinasi;

      console.log(formattedDate);

      // Tambahkan validasi destinasi ditemukan
      const destinasi = await destinasimodel.getById(id_destinasi);
      if (!destinasi) {
        return res.status(404).json({ error: 'Destinasi tidak ditemukan' });
      }

      console.log(destinasi);

      res.render('user/pembayarandestinasi', { destinasi, formattedDate });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Gagal mengambil informasi destinasi' });
    }
  },

  prosesPemesanan: async (req, res) => {
    try {
      const {
        id_destinasi,
        nama,
        email,
        alamat,
        no_telepon,
        hargades,
        nama_destinasi,
        jumlah_orang,
        tgl_pergi,
        tgl_pulang,
        bank,
        no_rek,
      } = req.body;
  
      const metode = 'langsung'; // Mengasumsikan 'langsung' untuk metode, sesuaikan sesuai kebutuhan.
  
      if (metode === 'langsung') {
        // Hitung total harga berdasarkan hargades dan jumlah_orang
        const total_harga = hargades * jumlah_orang;
  
        const stokUpdateResult = await pemesananModel.kurangiStokDestinasi(nama_destinasi, jumlah_orang, (result) => {
          if (!result.success) {
            return res.status(500).json({ error: 'Gagal mengurangi stok destinasi', details: result.error });
          }
  
          const dataPemesanan = {
            id_user: req.session.id_user,
            id_destinasi,
            nama,
            email,
            alamat,
            no_telepon,
            hargades,
            nama_destinasi,
            bank,
            no_rek,
            total_harga,
            jumlah_orang,
            tgl_pergi,
            tgl_pulang,
          };
  
          pemesananModel.addPemesanan(dataPemesanan, (pemesananResult) => {
            if (!pemesananResult.success) {
              return res.status(500).json({ error: 'Gagal menambahkan data pemesanan', details: pemesananResult.error });
            }
  
            setTimeout(() => {
              res.redirect('/user/index'); // Redirect ke halaman login setelah pendaftaran berhasil
            }, 2000);
          });
        });
      } else {
        res.status(400).json({ error: 'Metode pembayaran tidak valid' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Terjadi kesalahan dalam proses pemesanan', details: err.message });
    }
  },
  formPemesananPenginapan: async (req, res) => {
    try {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
      const id_penginapan = req.params.id_penginapan;

      console.log(formattedDate);

      // Tambahkan validasi penginapan ditemukan
      const penginapan = await penginapanmodel.getById(id_penginapan);
      if (!penginapan) {
        return res.status(404).json({ error: 'Penginapan tidak ditemukan' });
      }

      console.log(penginapan);

      res.render('user/pembayaranpenginapan', { penginapan, formattedDate });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Gagal mengambil informasi penginapan' });
    }
  },
  prosesPemesananPenginapan: async (req, res) => {
    try {
      const {
        nama,
        id_penginapan,
        email,
        alamat,
        no_telepon,
        harganip,
        nama_penginapan,
        jumlah_orang,
        tgl_pergi,
        tgl_pulang,
        bank,
        no_rek,
      } = req.body;
  
      const metode = 'langsung'; // Mengasumsikan 'langsung' untuk metode, sesuaikan sesuai kebutuhan.
  
      if (metode === 'langsung') {
        // Hitung total harga berdasarkan harganip dan jumlah_orang
        const total_harga = harganip * jumlah_orang;
  
        const stokUpdateResult = await pemesananModel.kurangiStokPenginapan(nama_penginapan, jumlah_orang, (result) => {
          if (!result.success) {
            return res.status(500).json({ error: 'Gagal mengurangi stok penginapan', details: result.error });
          }
  
          const dataPemesanan = {
            id_user: req.session.id_user,
            id_penginapan,
            nama,
            email,
            alamat,
            no_telepon,
            harganip,
            nama_penginapan,
            bank,
            no_rek,
            total_harga,
            jumlah_orang,
            tgl_pergi,
            tgl_pulang,
          };
  
          pemesananModel.addPemesananPenginapan(dataPemesanan, (pemesananResult) => {
            if (!pemesananResult.success) {
              return res.status(500).json({ error: 'Gagal menambahkan data pemesanan', details: pemesananResult.error });
            }
  
            setTimeout(() => {
              res.redirect('/user/index'); // Redirect ke halaman login setelah pendaftaran berhasil
            }, 2000);
          });
        });
      } else {
        res.status(400).json({ error: 'Metode pembayaran tidak valid' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Terjadi kesalahan dalam proses pemesanan', details: err.message });
    }
  },
  formPemesananPaket: async (req, res) => {
    try {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
      const new_id_pakettour = req.params.new_id_pakettour;

      console.log(formattedDate);

      // Tambahkan validasi paket ditemukan
      const paket = await paketmodel.getById(new_id_pakettour);
      if (!paket) {
        return res.status(404).json({ error: 'paket tidak ditemukan' });
      }

      console.log(paket);

      res.render('user/pembayaranpaket', { paket, formattedDate });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Gagal mengambil informasi paket' });
    }
  },
  prosesPemesananPaket: async (req, res) => {
    try {
      const {
        nama,
        new_id_pakettour,
        email,
        alamat,
        no_telepon,
        harga_perket,
        namapaket,
        jumlah_orang,
        tgl_pergi,
        tgl_pulang,
        bank,
        no_rek,
      } = req.body;
  
      const metode = 'langsung'; // Mengasumsikan 'langsung' untuk metode, sesuaikan sesuai kebutuhan.
  
      if (metode === 'langsung') {
        // Hitung total harga berdasarkan harga_perket dan jumlah_orang
        const total_harga = harga_perket * jumlah_orang;
  
        const stokUpdateResult = await pemesananModel.kurangiStokPaket(namapaket, jumlah_orang, (result) => {
          if (!result.success) {
            return res.status(500).json({ error: 'Gagal mengurangi stok paket', details: result.error });
          }
  
          const dataPemesanan = {
            id_user: req.session.id_user,
            new_id_pakettour,
            nama,
            email,
            alamat,
            no_telepon,
            harga_perket,
            namapaket,
            bank,
            no_rek,
            total_harga,
            jumlah_orang,
            tgl_pergi,
            tgl_pulang,
          };
  
          pemesananModel.addPemesananPaket(dataPemesanan, (pemesananResult) => {
            if (!pemesananResult.success) {
              return res.status(500).json({ error: 'Gagal menambahkan data pemesanan', details: pemesananResult.error });
            }
  
            setTimeout(() => {
              res.redirect('/user/paket'); 
            }, 2000);
          });
        });
      } else {
        res.status(400).json({ error: 'Metode pembayaran tidak valid' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Terjadi kesalahan dalam proses pemesanan', details: err.message });
    }
  },
};

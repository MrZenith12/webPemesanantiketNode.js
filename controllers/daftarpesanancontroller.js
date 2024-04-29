// controllers/daftarpesanancontroller.js

const DaftarPesanan = require('../models/modelhapus');

class DaftarPesananController {
    static renderDaftarPesanan(req, res) {
      const id_user = req.session.id_user;
      const username = req.session.username;

      DaftarPesanan.allPesanan(id_user, (err, listPesanan) => {
          if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
          } else {
              DaftarPesanan.allPesananPenginapan(id_user, (errPenginapan, listPenginapan) => {
                  if (errPenginapan) {
                      console.error(errPenginapan);
                      res.status(500).send('Internal Server Error');
                  } else {
                      DaftarPesanan.allPesananPaket(id_user, (errPaket, listPaket) => {
                          if (errPaket) {
                              console.error(errPaket);
                              res.status(500).send('Internal Server Error');
                          } else {
                              // Render halaman daftarpesanan dan kirimkan data pesanan
                              res.render('user/daftarpesanan', { listPesanan, listPenginapan, listPaket, username });
                          }
                      });
                  }
              });
          }
      });
  }

  static renderGambar(req, res) {
    const id_destinasi = req.params.id_destinasi;

    DaftarPesanan.getGambarById(id_destinasi, (err, gambarData) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        if (gambarData) {
          res.writeHead(200, { 'Content-Type': 'image/jpeg' });
          res.end(gambarData);
        } else {
          res.status(404).send('Gambar tidak ditemukan');
        }
      }
    });
  }

  static renderGambarPenginapan(req, res) {
    const id_penginapan = req.params.id_penginapan;

    DaftarPesanan.getGambarByIdPenginapan(id_penginapan, (err, gambarData) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        if (gambarData) {
          res.writeHead(200, { 'Content-Type': 'image/jpeg' });
          res.end(gambarData);
        } else {
          res.status(404).send('Gambar tidak ditemukan');
        }
      }
    });
  }

  static renderGambarPaket(req, res) {
    const new_id_pakettour = req.params.new_id_pakettour;

    DaftarPesanan.getGambarByIdPaket(new_id_pakettour, (err, gambarData) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        if (gambarData) {
          res.writeHead(200, { 'Content-Type': 'image/jpeg' });
          res.end(gambarData);
        } else {
          res.status(404).send('Gambar tidak ditemukan');
        }
      }
    });
  }

    static cancelPesanan(req, res) {
      const id_pesandes = req.params.id_pesandes;
      DaftarPesanan.cancelPesanan(id_pesandes, (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
          } else {
              res.redirect('/daftarpesanan'); // Redirect ke halaman daftar pesanan setelah pembatalan
          }
      });
  }

  static cancelPesananPenginapan(req, res) {
    const id_pespenginapan = req.params.id_pespenginapan;
    DaftarPesanan.cancelPesananPenginapan(id_pespenginapan, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/daftarpesanan'); // Redirect ke halaman daftar pesanan setelah pembatalan
      }
    });
  }


}

module.exports = DaftarPesananController;

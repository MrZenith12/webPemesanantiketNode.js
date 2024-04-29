const express = require('express');
const session = require('express-session');
const connection = require('./db');
const paketcontroller = require('./controllers/paketcontroller');
const penginapancontroller = require('./controllers/penginapancontroller');
const destinasicontroller = require('./controllers/destinasicontroller');
const usercontroller = require('./controllers/usercontroller');
const pemesanancontroller = require('./controllers/pemesanancontroller');
const registerController = require('./controllers/registercontroller');
const detaildestinasi = require('./controllers/detailcontroller');
const detailpenginapan = require('./controllers/detailcontroller');
const detailpaket = require('./controllers/detailcontroller');
const DaftarPesananController = require('./controllers/daftarpesanancontroller');
const PembayaranDestinasiController = require('./controllers/pembayarandestinasicontroller');
const PembayaranPenginapanController = require('./controllers/pembayaranpenginapancontroller');
const path = require('path');
const multer = require('multer');

const app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'alif2222', // Ganti dengan nilai secret yang kuat
    resave: true,
    saveUninitialized: true
  }));

//rute admin
app.get('/admin/index', (req, res) => {
    res.render('admin/index'); // Ini akan merender index.ejs dari folder "views"
});
// Routing CRUD Paket
app.get('/paket', paketcontroller.listPaket);
app.get('/editpaket/:new_id_pakettour', paketcontroller.editPaketForm);
app.get('/get_imagepaket/:new_id_pakettour', paketcontroller.getGambarPaket);
app.get('/formtambah', paketcontroller.tambahPaketForm);

// Route untuk menangani permintaan POST
app.post('/prosestambah', paketcontroller.createPaket);
app.post('/editpaketpaket/:id_paket', paketcontroller.updatePaket);

app.delete('/deletepaket/:new_id_pakettour', paketcontroller.deletePaket);
//TUTUP

// Routing CRUD Penginapan
app.get('/penginapan', penginapancontroller.listPenginapan);
app.get('/editpenginapan/:id_penginapan', penginapancontroller.editPenginapanForm);
app.get('/get_imagepenginapan/:id_penginapan', penginapancontroller.getGambarPenginapan);
app.get('/formtambahpenginapan', penginapancontroller.tambahPenginapanForm);

// Route untuk menangani permintaan POST
app.post('/prosestambahpenginapan', penginapancontroller.createPenginapan);
app.post('/proseseditpenginapan/:id_penginapan', penginapancontroller.updatePenginapan);

app.delete('/deletepenginapan/:id_penginapan', penginapancontroller.deletePenginapan);
// TUTUP

// Routing CRUD Destinasi
app.get('/destinasi', destinasicontroller.listDestinasi);
app.get('/editdestinasi/:id_destinasi', destinasicontroller.editDestinasiForm);
app.get('/get_imagedestinasi/:id_destinasi', destinasicontroller.getGambarDestinasi);
app.get('/formtambahdestinasi', destinasicontroller.tambahDestinasiForm);

// Route untuk menangani permintaan POST
app.post('/prosestambahdestinasi', destinasicontroller.createDestinasi);
app.post('/proseseditdestinasi/:id_destinasi', destinasicontroller.updateDestinasi);

app.delete('/deletedestinasi/:id_destinasi', destinasicontroller.deleteDestinasi);
// TUTUP

// Route untuk menangani permintaan POST
app.get('/pembayarandestinasi', PembayaranDestinasiController.listPembayaranDestinasi);
app.get('/editpemesanandestinasi/:id_pesdes', PembayaranDestinasiController.editDestinasiForm);
// app.post('/pembayarandestinasi/update/:id_pesdes', PembayaranDestinasiController.updatePembayaranDestinasi);
app.post('/deletepesan/:id_pesdes', PembayaranDestinasiController.deletePembayaranDestinasi);
// TUTUP

// Route untuk menangani permintaan POST
app.get('/pembayaranpenginapan', PembayaranPenginapanController.listPenginapan);
app.get('/editpespenginapan/:id_pespenginapan', PembayaranPenginapanController.editPenginapanForm);
app.post('/proses/:id_pespenginapan', PembayaranPenginapanController.updatePenginapan);
// app.post('/deletepesanpenginapan/:id_pespenginapan', PembayaranDestinasiController.deletePembayaranDestinasi);
// TUTUP

// Routing CRUD Table Users
app.get('/users', usercontroller.listUsers);
//TUTUP

//rute halaman depan
app.get('/', destinasicontroller.getAllDestinasi);
app.get('/listdestinasi', destinasicontroller.allDestinasi);
app.get('/listpenginapan', penginapancontroller.allPenginapan);
app.get('/listpaket', paketcontroller.allPaket);

//rute halaman depan
app.get('/login', (req, res) => {
    res.render('login'); // Ini akan merender index.ejs dari folder "views"
});
// Penanganan form login
app.post('/login/validate', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Query untuk memeriksa keberadaan user dalam database
  const query = 'SELECT * FROM tbl_login WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) throw err;

    // Jika user ditemukan
    if (results.length > 0) {
      const user = results[0];

      // Simpan ID pengguna di sesi
      req.session.loggedin = true;
      req.session.email = req.body.email;

      // Query untuk mendapatkan id_user
      const query1 = 'SELECT id_user FROM tbl_login WHERE email = ?';
      connection.query(query1, [req.session.email], (err, results) => {
        if (err) throw err;

        // Setelah mendapatkan id_user, bisa disimpan di sesi atau digunakan sesuai kebutuhan
        req.session.id_user = results[0].id_user;
        console.log('id setelah login:', req.session.id_user);

        if (user.role === 'user') {
          return res.send(
            `<script>alert("Login Berhasil"); window.location.href = '/user/index' ; </script>`
          );
        } else if (user.role === 'admin') {
          res.redirect('/admin/index');
        } else {
          res.send('Role tidak valid');
        }
      });
    } else {
      res.send(`<script>alert("Maaf Email atau Password anda salah silahkan login kembali"); window.location.href = '/login' ; </script>`);
    }
  });
});


// Routing untuk menampilkan halaman registrasi
app.get('/register', registerController.showRegisterForm);
// Routing untuk menangani proses registrasi
app.post('/register/validate', registerController.registerUser);
const checkAuth = (req, res, next) => {
  if (req.session.loggedin) {
    res.locals.email = req.session.email; // Set variabel global untuk pengguna
    next();
  } else {
    res.redirect('/login');
  }
};
// //TUTUP

//RUTE halaman User
app.get('/user/index', checkAuth, destinasicontroller.userAllDestinasi);
app.get('/user/paket', checkAuth, paketcontroller.userAllPaket);
app.get('/user/destinasi', checkAuth, destinasicontroller.userAllDestinasides);
app.get('/user/penginapan', checkAuth, penginapancontroller.userAllPenginapan);
app.get('/pesandestinasi/:id_destinasi', pemesanancontroller.formPemesanan);
app.get('/user/daftarpesanan', DaftarPesananController.renderDaftarPesanan);
app.get('/gambar/:id_destinasi', DaftarPesananController.renderGambar);
app.get('/gambarpenginapan/:id_penginapan', DaftarPesananController.renderGambarPenginapan);
app.get('/gambarpaket/:new_id_pakettour', DaftarPesananController.renderGambarPaket);
app.get('/detaildestinasi/:id_destinasi', detaildestinasi.Alldetaildestina);
app.get('/pesanpenginapan/:id_penginapan', pemesanancontroller.formPemesananPenginapan);
app.get('/detailpenginapan/:id_penginapan', detailpenginapan.Alldetailpengina);
app.get('/pesanpaket/:new_id_pakettour', pemesanancontroller.formPemesananPaket);
app.get('/detailpaket/:new_id_pakettour', detailpaket.Alldetailpaket);

app.post('/proseshapuspemesanan/proseshapus/:id_pesandes', DaftarPesananController.cancelPesanan);
app.post('/proseshapuspemesanan/proseshapuspenginapan/:id_pespenginapan', DaftarPesananController.cancelPesananPenginapan);
app.post('/pesandestinasi/prosesPemesanan', pemesanancontroller.prosesPemesanan);
app.post('/pesanpenginapan/prosesPemesanan', pemesanancontroller.prosesPemesananPenginapan);
app.post('/pesanpaket/prosesPemesanan', pemesanancontroller.prosesPemesananPaket);

app.get('/logout', (req, res) => {
  res.send(
    `<script>
      if (window.confirm('Apakah Anda yakin ingin logout?')) {
        window.location.href = '/';
      } else {
        window.location.href = '/user/index';
      }
    </script>`
  );
});

app.get('/', (req, res) => {
    res.render('index'); // Ini akan merender index.ejs dari folder "views"
});

app.listen(3000, () => {
    console.log('Server berjalan pada port 3000');
});

const destinasimodel = require('../models/destinasimodel');
const penginapanmodel = require('../models/penginapanmodel');
const paketmodel = require('../models/paketmodel');
const path = require('path');
const fs = require('fs');


exports.Alldetaildestina = (req, res) => {
    const { id_destinasi } = req.params;

    destinasimodel.getid(id_destinasi, (err, destinasi) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        if (!destinasi) {
            return res.status(404).send('Destination not found');
        }

        res.render('user/detaildestinasi', { destinasi });
    });
};

exports.Alldetailpengina = (req, res) => {
    const { id_penginapan } = req.params;

    penginapanmodel.getid(id_penginapan, (err, penginapan) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        if (!penginapan) {
            return res.status(404).send('Destination not found');
        }

        res.render('user/detailpenginapan', { penginapan });
    });
};

exports.Alldetailpaket = (req, res) => {
    const { id_paket } = req.params;

    paketmodel.getid(id_paket, (err, paket) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        if (!paket) {
            return res.status(404).send('Destination not found');
        }

        res.render('user/detailpaket', { paket });
    });
};


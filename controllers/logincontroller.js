const loginModel = require('../models/modellogin');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await loginModel.authenticateUser(username, password);
        console.log(user); // Cetak user ke konsol

        if (user) {
            req.session.id_user = user.id_user;
            req.session.username = user.username;
            req.session.role = user.role;

            console.log(req.session.id_user);
            console.log(req.session.username);
            console.log(req.session.role);

            if (user.role === "admin") {
                res.redirect('/admin/index'); // Sesuaikan dengan rute dashboard admin
            } else if (user.role === "user") {
                res.redirect('/user/index'); // Sesuaikan dengan rute dashboard user
            }
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

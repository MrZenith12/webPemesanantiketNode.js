const db = require('../db');// Sesuaikan dengan lokasi koneksi

class LoginModel {
    authenticateUser(username, password) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM tbl_login WHERE username = ? AND password = ?';
            db.query(query, [username, password], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }
    
    
}

module.exports = new LoginModel();

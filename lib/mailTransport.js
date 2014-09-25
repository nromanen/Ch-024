var nodemailer = require('nodemailer');


exports.transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ticapac@gmail.com',
        pass: 'charming273008'
    }
});


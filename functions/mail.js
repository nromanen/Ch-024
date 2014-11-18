var nodemailer = require('nodemailer');


exports.registeredMail = function (mailData) {
// create reusable transporter object using SMTP transport
    //mailData example
    /*
     var mailData = {
     to: 'ticapac@gmail.com',
     subject: 'Great victory',
     plainText: 'any plain text',
     htmlBody: 'ANY HTML'
     };

     */
// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails
// setup e-mail data with unicode symbols

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'softserveinfo@gmail.com',
            pass: 'ss7952789461237946123'
        }
    });


    var mailOptions = {
        from: 'SoftServe ITA ✔ <softserveinfo@gmail.com>', // sender address
        to: mailData.to,                             // list of receivers
        subject: 'SoftServe IT Academy',             // Subject line
        htmlBody: 'You have successfully signed up for <b>SoftServe IT Academy program!</b>'
        plainText: 'You have successfully signed up for <b>SoftServe IT Academy program!</b>'
    };

// send mail with defined transport object


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
};
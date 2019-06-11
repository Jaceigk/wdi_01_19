// https://myaccount.google.com/lesssecureapps?pli=1
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yuri.shkoda@codeimmersives.com',
        pass: 'password'
    }
});

var mailOptions = {
    from: 'yuri.shkoda@codeimmersives.com',
    to: 'yuri.shkoda@codeimmersives.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
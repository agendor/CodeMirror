var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
        user: 'webmaster@to.agendor.com.br',
        pass: 'uK88coSn'
    }
});


// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Interview App ✔ <webmaster@to.agendor.com.br>', // sender address
    to: 'tulio@agendor.com.br' // list of receivers
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);

});

module.exports.sendSolution = function (email, solution) {
  var mailOptions = {
    from: 'Interview App ✔ <webmaster@to.agendor.com.br>',
    to: 'tulio@agendor.com.br',
    subject: 'Solution submitted - '+email,
    text: solution
  };
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);

  });
}
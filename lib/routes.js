
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://admin:kwa2ps9mno@ds063124.mongolab.com:63124/heroku_kzdlqwh3');
// mongoose.connect('mongodb://localhost/test');

// var Cat = mongoose.model('candidate', { name: String });

// var kitty = new Cat({ name: 'Zildjian' });
// kitty.save(function (err) {
//   if (err) // ...
//   console.log('meow');
// });

var emailSender = require('./email-sender');

module.exports = {
  instructions: function instructions(req, res) {
    res.render('instructions');
  },

  start: function start(req, res) {
    var email = req.query.email;
    if (isEmailValid(email)) {
      res.render('front-end-engineer', {
        email: email
      });  
    } else {
      res.render('instructions', {
        error: "This e-mail was already used or is invalid."
      });  
    }
  },

  submit: function submit(req, res) {
    console.log(req.body);
    var email = req.body.email;
    var solution = req.body.solution;
    emailSender.sendSolution(email, solution);
    res.send('Thanks! Solution sent successfully!');
  }
};

function isEmailValid(email) {
  return true;
}
var User = require('../models/user.js');

module.exports = {
  signin: function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  new User({ username: username })
    .fetch()
    .then(function(user) {
      if (!user) {
        res.redirect('/login');
      } else {
        // BASIC VERSION
        // bcrypt.compare(password, user.get('password'), function(err, match) {
        //   if (match) {
        //     util.createSession(req, res, user);
        //   } else {
        //     res.redirect('/login');
        //   }
        // });
        // ADVANCED VERSION -- see user model
        user.comparePassword(password, function(match) {
          if (match) {
            util.createSession(req, res, user);
          } else {
            res.redirect('/login');
          }
        });
      }
    });
  }, 
  signup: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    new User({ username: username })
    .fetch()
    .then(function(user) {
      if (!user) {
        // BASIC VERSION
        // bcrypt.hash(password, null, null, function(err, hash) {
        //   Users.create({
        //     username: username,
        //     password: hash
        //   }).then(function(user) {
        //       util.createSession(req, res, user);
        //   });
        // });
        // ADVANCED VERSION -- see user model
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save()
          .then(function(newUser) {
            util.createSession(req, res, newUser);
          });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
  }

};
var mailService = require('../services/mail');
var passService = require('../services/password');
/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
var AuthController = {
 
  logout: function (req, res) {
    req.logout();
    res.status(200).send();
  },

  reset: function(req, res){
    passService.update(req, res, process.env.PASS_MIN_LENGTH, function(err, newPass, user){
      if (err){
        res.status(500).jsonx({message:err});
      }
      mailService.send({subject:'new password', body:{pass:newPass}}, 'reset', user.email, function(){
        res.status(200).send();
      });
    });
  },

  checkAuth: function(req, res){
    if(req.user){
      res.status(200).jsonx(req.user);
    } else {
      res.status(401).send();
    }
  },

  provider: function (req, res) {
    passport.endpoint(req, res); 
  },

 
  callback: function (req, res) {
    function checkErrors (err) {

      // Only certain error messages are returned via req.flash('error', someError)
      // because we shouldn't expose internal authorization errors to the user.
      // We do return a generic error and the original request body.
      var flashError = req.flash('error')[0];

      if (err && !flashError ) {
        req.flash('error', 'Error.Passport.Generic');
        res.status(500).jsonx({message:'Error.Passport.Generic'});
      } else if (flashError) {
        req.flash('error', flashError);
        res.status(500).jsonx({message: flashError});
      }
    }

    passport.callback(req, res, function (err, user) {
      if (err) {
        return checkErrors(err);
      }

      req.login(user, function (err) {
        if (err) {
          return checkErrors(err);
        }

        res.status(200).jsonx(user);
      });
    });
  },

  /**
   * Disconnect a passport from a user
   *
   * @param {Object} req
   * @param {Object} res
   */
  disconnect: function (req, res) {
    passport.disconnect(req, res);
  }
};

module.exports = AuthController;

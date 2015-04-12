/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  get: function (req, res) {
    var searchObject = {};
    if (req.body.id) {
      searchObject.id = req.body.id;
    }
    User.find().where(searchObject).exec(function(err, users){
      if (err){
        res.satus(500).send();
      } else {
        res.status(200).jsonx(users);
      }
    })
  },
  getByEmail: function(req, res){
    User.find().where({email:req.body.email}).then(function(user){
      res.status(200).jsonx(user);
    }).catch(function(err){
      res.status(404).send({message:'Cant find user', error:err});
    });
  },
  update: function(req, res) {
    var modyfiedUser = {name:req.body.name, lastName:req.body.lastName};
    if (req.user.admin){
      modyfiedUser.admin = req.body.admin;
    }
    if (req.body.id) {
      User.update({id: req.body.id}, modyfiedUser, function (err, user) {
        if (!err) {
          console.log('update', req.body.id);
          sails.sockets.blast('user', {id: req.body.id, verb: 'updated'});
          res.status(200).send(user);
        } else {
          res.status(500).send();
        }
      });
    } else {
      res.status(400).send();
    }
  }
};


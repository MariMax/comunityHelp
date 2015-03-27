function response(res, err, event){
  if (err){
    res.status(500).send();
  } else {
    res.status(200).send(event);
  }
}
module.exports = {
  save:function(req, res){
    if (req.body.id){
      Event.update({id:req.body.id}, req.body, function(err, event){
        if (!err) {
          console.log('update',req.body.id );
          sails.sockets.blast('event', {id:req.body.id, verb:'updated'});
          //Event.message(req.body.id, {verb:'updated'});
        }
        response(res, err, event);
      })
    } else {
      Event.create(req.body, function (err, event) {
        if (!err) {
          console.log('create',event.id );
          sails.sockets.blast('event', {id:event.id, verb:'created'});
          //Event.publishCreate({id:event.id});
        }
        response(res, err, event);
      });
    }
  },
  getList:function(req, res){
    Event.find({},function (err, events) {
      if (err) {
        res.send(500);
      } else {
        res.send(events);
      }
    });
  },
  get:function(req, res){
    Event.findOne({id:req.body.id}, function (err, events) {
      if (err) {
        res.send(500);
      } else {
        res.send(events);
      }
    });
  },
  remove:function(req, res){
    Event.destroy({id:req.body.id}).exec(function (err, events) {
      if (err) {
        res.send(500);
      } else {
        console.log('destroy',req.body.id );
        sails.sockets.blast('event', {id:req.body.id, verb:'destroyed'});
        //Event.message(req.body.id, {verb:'destroyed'});
        res.send(events);
      }
    });
  },
  count:function(req,res){
    Event.count({},function(err, count){
      console.dir(count);
      if (err) {
        res.send(500);
      } else {
        res.status(200).send({count:count});
      }
    });
  },
  subscribe:function(req, res){
    if (req.isSocket){
      console.log('User with socket id '+sails.sockets.id(req)+' is now subscribed to the model class \'Event\'.');
    }
    res.send(200);
  }
};


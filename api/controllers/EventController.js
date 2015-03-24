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
          Event.publishUpdate(req.body.id);
        }
        response(res, err, event);
      })
    } else {
      Event.create(req.body, function (err, event) {
        if (!err) {
          Event.publishCreate(event.id);
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
        Event.publishDestroy(req.body.id);
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
      Event.watch(req);
      console.log('User with socket id '+sails.sockets.id(req)+' is now subscribed to the model class \'Event\'.');
    }
    res.send(200);
  }
};


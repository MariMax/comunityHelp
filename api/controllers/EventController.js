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
        response(res, err, event);
      })
    } else {
      Event.create(req.body, function (err, event) {
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
    Event.destroy({id:req.body.id}, function (err, events) {
      if (err) {
        res.send(500);
      } else {
        res.send(events);
      }
    });
  }
};


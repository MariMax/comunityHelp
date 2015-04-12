/**
 * ChatroomController
 *
 * @description :: Server-side logic for managing Chatrooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _ = require('lodash');
var async = require('async');
var Q = require('q');

function populateLastMessage(chatRoom) {
  return Message.findOne({id: chatRoom.messages[chatRoom.messages.length - 1]}).then(function (message) {
    var defer = Q.defer();
    User.findOne({id: message.user}).then(function (user) {
      message.user = user;
      defer.resolve(message);
    }).catch(function () {
      defer.reject();
    });
    return defer.promise;
  }).then(function (message) {
    chatRoom.lastMessage = message;
    return chatRoom;
  });
}

function populateMessage(messageId) {
  return Message.findOne({id: messageId}).then(function (message) {
    var defer = Q.defer();
    User.findOne({id: message.user}).then(function (user) {
      message.user = user;
      defer.resolve(message);
    }).catch(function () {
      defer.reject();
    });
    return defer.promise;
  });
}

function getChatroomWithLastMessage(chatRooms) {
  var defer = Q.defer();
  var promises = [];
  _.each(chatRooms, function (chatRoom) {
    promises.push(populateLastMessage(chatRoom));
  });
  Q.all(promises).then(function (results) {
    defer.resolve(results);
  }).catch(function (err) {
    defer.reject(err);
  });
  return defer.promise;
}

function getChatroomWithMessages(chatRoom) {
  var defer = Q.defer();
  var promises = [];
  _.each(chatRoom.messages, function (message) {
    promises.push(populateMessage(message));
  });
  Q.all(promises).then(function (results) {
    chatRoom.messages = results;
    defer.resolve(chatRoom);
  }).catch(function (err) {
    defer.reject(err);
  });
  return defer.promise;
}

module.exports = {
  getList: function (req, res) {
    var userId = req.body.userId;
    Chatroom.find().where({users: userId}).then(function (chatRooms) {
      return getChatroomWithLastMessage(chatRooms);
    }).then(function (result) {
      res.status(200).jsonx(result);
    }).catch(function (err) {
      res.status(500).send(err);
    });
  },
  get: function (req, res) {
    var chatRoomId = req.body.chatRoomId;
    Chatroom.findOne({id: chatRoomId, users: req.user.id}).then(function (chatRoom) {
      return getChatroomWithLastMessage([chatRoom]);
    }).then(function (chatRooms) {
      res.status(200).jsonx(chatRooms[0]);
    }).catch(function () {
      res.status(500).send();
    });
  },
  getFull: function (req, res) {
    var chatRoomId = req.body.chatRoomId;
    Chatroom.findOne({id: chatRoomId, users: req.user.id}).then(function (chatRoom) {
      return getChatroomWithMessages(chatRoom);
    }).then(function (chatRoom) {
      res.status(200).jsonx(chatRoom);
    }).catch(function () {
      res.status(500).send();
    });
  },
  getMessage: function (req, res) {
    var messageId = req.body.messageId;
    populateMessage(messageId).then(function(message){
      res.status(200).jsonx(message);
    }).catch(function () {
      res.status(500).send();
    });
  },
  addMessage: function (req, res) {
    var chatRoomId = req.body.chatRoomId;
    var message = req.body.message;
    async.parallel({
        chatRoom: function (callback) {
          return Chatroom.findOne({id: chatRoomId, users: req.user.id}, callback);
        },
        firstMessage: function (callback) {
          Message.create({message: message, user: req.user}, callback);
        }
      },
      function (err, results) {
        if (!err) {
          results.chatRoom.messages.push(results.firstMessage.id);
          results.chatRoom.save(function (err, chatRoom) {
            if (!err) {
              res.status(200).send();
              sails.sockets.blast('chatrooms', {
                id: results.chatRoom.id,
                messageId: results.firstMessage.id,
                userIds: results.chatRoom.users,
                verb: 'newMessage'
              });
            } else {
              res.status(500).send();
            }
          });

        } else {
          res.status(500).send();
        }
      });
  },
  newChatRoom: function (req, res) {
    var userId = req.body.userId;
    var message = req.body.message;
    async.parallel({
        user1: function (callback) {
          User.findOne({id: userId}, callback);
        },
        user2: function (callback) {
          User.findOne({id: req.user.id}, callback);
        },
        firstMessage: function (callback) {
          Message.create({message: message, user: req.user}, callback);
        }
      },
      function (err, results) {
        if (!err) {
          Chatroom.create({
            users: [results.user1.id, results.user2.id],
            messages: [results.firstMessage.id]
          }, function (err, chatRoom) {
            if (!err) {
              sails.sockets.blast('chatrooms', {
                id: chatRoom.id,
                userIds: [results.user1.id, results.user2.id],
                verb: 'created'
              });
              res.status(200).jsonx(chatRoom);
            } else {
              res.status(500).send({message: 'Cant create chatroom', error: err});
            }
          });
        } else {
          res.status(500).send({message: 'Cant find user or create a message', error: err});
        }
      });
  },
  invite: function (req, res) {
    var chatRoomId = req.body.chatRoomId;
    var userId = req.body.userId;
    async.parallel({
        user1: function (callback) {
          User.findOne({id: userId}, callback);
        },
        user2: function (callback) {
          User.findOne({id: req.user.id}, callback);
        },
        chatRoom: function (callback) {
          Chatroom.findOne({id: chatRoomId}, callback);
        }
      },
      function (err, results) {
        if (!err) {
          var userInChatRoom = _.indexOf(results.chatRoom.users, results.user1.id);
          if (userInChatRoom) {
            res.status(200).jsonx(results.chatRoom);
            return;
          }

          results.chatRoom.users.push(userId);
          results.chatRoom.save(function (err, chatRoom) {
            if (!err) {
              sails.sockets.blast('chatrooms', {id: chatRoom.id, userId: userId, verb: 'userAdded'});
              res.status(200).jsonx(chatRoom);
            } else {
              res.status(500).send({message: 'Cant save chatroom', error: err});
            }
          });

        } else {
          res.status(500).send({message: 'Cant find user or chatroom', error: err});
        }
      });
  },
  leave: function (req, res) {
    var chatRoomId = req.body.chatRoomId;
    Chatroom.findOne({id: chatRoomId}, function (err, chatRoom) {
      if (!err) {
        _.remove(chatRoom.users, req.user.id);
        if (chatRoom.users.length === 0) {
          //if last user has been gone, then we need to destroy room
          Chatroom.destroy({id: chatRoom.id}).exec(function (err, data) {
            if (!err) {
              res.status(200).send()
            } else {
              res.status(500).send({message: 'Cant leave chatroom', error: err});
            }
          });
        } else {
          chatRoom.save(function (err, chatRoom) {
            if (!err) {
              sails.sockets.blast('chatrooms', {id: chatRoom.id, userId: req.user.id, verb: 'userGone'});
              res.status(200).jsonx(chatRoom);
            } else {
              res.status(500).send({message: 'Cant save chatroom after leave', error: err});
            }
          });
        }
      } else {
        res.status(500).send({message: 'Cant find chatroom', error: err});
      }
    });
  }
};


var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    name  : { type: 'string'},
    avatar : { type: 'string', defaultsTo:'assets/images/noavatar.png'},
    lastName  : { type: 'string'},
    email     : { type: 'email',  unique: true },
    admin:{type:'boolean', defaultsTo:false},
    passports : { collection: 'Passport', via: 'user' }
  }
};

module.exports = User;

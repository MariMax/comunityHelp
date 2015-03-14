var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    name  : { type: 'string'},
    lastName  : { type: 'string'},
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' }
  }
};

module.exports = User;

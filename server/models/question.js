var db = require('../config/db');
var User = require('./user');

var Question = db.Model.extend({
  tableName: 'questions',
  hasTimestamps: true,
  defaults: {
  },
  users: function() {
    return this.hasMany(User);
  },
  initialize: function() {
  }
});

module.exports = Question;

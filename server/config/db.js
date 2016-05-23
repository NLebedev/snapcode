var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../../db/snapcode.sqlite')
  },
  useNullAsDefault: true
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('questions').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('questions', function (question) {
      question.increments('id').primary();
      question.string('text', 255);
      question.string('answer', 255);
      question.string('category', 255);
      question.string('topic', 255);
      question.integer('difficulty');
      question.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.string('role', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('userAnswers').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('userAnswers', function (userAnswer) {
      userAnswer.increments('id').primary();
      userAnswer.integer('userId').unsigned().references('users.id').onDelete('CASCADE');
      userAnswer.integer('questionId').unsigned().references('questions.id').onDelete('CASCADE');
      userAnswer.string('answer',255);
      userAnswer.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

/************************************************************/
// Add additional schema definitions below
/************************************************************/


module.exports = db;

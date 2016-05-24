var path = require('path');
var knex = require('knex')({
  // client: 'sqlite3',
  client: 'pg',
  connection: {
    user: 'postgres',
    database: 'postgres',
    port: 5432,
    host: 'localhost',
    password: 'postgrespass'
    // filename: path.join(__dirname, '../../db/snapcode.sqlite')
  },
  useNullAsDefault: true
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('questions').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('questions', function (question) {
      question.increments('id').primary();
      question.string('text', 255).notNullable();
      question.string('answer', 255).notNullable();
      question.string('category', 255).notNullable();
      question.integer('difficulty').notNullable();
      question.text('hint');
      question.text('terminal_response');
      question.string('topic', 255).notNullable();
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

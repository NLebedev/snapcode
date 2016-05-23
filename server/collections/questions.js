var db = require('../config/db');
var Question = require('../models/question');

var Questions = new db.Collection();

Questions.model = Question;

module.exports = Questions;

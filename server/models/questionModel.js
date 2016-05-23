var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  text: String,
  answer: String,
  categoryId: Number,
  tag: String,
  difficulty: Number
});

module.exports = mongoose.model('Question', QuestionSchema);

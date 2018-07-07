//Require Mongoose
var mongoose = require('mongoose');

//create a schema class
var Schema = mongoose.Schema;

//Creating the Schema for each article
var ArticleSchema = new Schema({
  title: String,
  date: Date,
  url: String
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

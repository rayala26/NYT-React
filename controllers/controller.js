const Article = require('../models/Article');

//Define the methods for the controller
module.exports = {
  //this method finds all articles in the db
  find: function(req, res) {
    Article.find().then(function(doc) {
        res.json(doc);
      }).catch(function(err) {
        res.json(err);
      });
  },
  // Addes new articles to the db
  insert: function(req, res) {
    Article.create(req.body).then(function(doc) {
      res.json(doc);
    }).catch(function(err) {
      res.json(err);
    });
  },
  // deletes articles form the db
  delete: function(req, res) {
    Article.remove({
      _id: req.params.id
    }).then(function(doc) {
      res.json(doc);
    }).catch(function(err) {
      res.json(err);
    });
  }
};
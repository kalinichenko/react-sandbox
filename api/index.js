var books = require('./books.json');
var detailsList = require('./details.json');

module.exports = function(app) {

  app.get('/api/books/:id', function(req, res) {
    setTimeout(() => {
      var details = detailsList[req.params.id]
      if (details) {
        res.send({data: details});
      } else {
        var title = books[req.params.id] && books[req.params.id].title;
        var error = title ? 'Details for item ' + title + ' not found' : 'Page not found';
        res.send({error});
      }
    }, 1000);
  });

  app.get('/api/books/', function(req, res) {
    setTimeout(() => res.send({data: books}), 1000);
  });
}

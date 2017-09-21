const express = require('express');
let hbs = require('express-handlebars');

const app = express();
//Setup View Engine with configuration options
app.engine('hbs', hbs({extname: 'hbs', defaultLayout:"main"}));
app.set('view engine', 'hbs');

//app.use('/', )

app.get('/', function (req, res) {
  res.render('main.hbs', "test");
});

app.get('/posts/new', function(req, res) {
    res.render('./views/layouts/layout.hbs');
});

app.listen(8082, function () {
  console.log('Example app listening on port 8082!');
});

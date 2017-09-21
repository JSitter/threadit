var express = require('express')
var exphbs = require('express-handlebars');

var app = express()

app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    res.render('posts-new', {msg: 'Hello World!'})
    //res.send("hello")

})

app.listen(8082, function () {
 console.log('Threaddit listening on port 8082!')
})

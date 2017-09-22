var express = require('express');
var hbs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

//connect to threadit database
mongoose.connect('localhost/threadit')

//log database errors to console
mongoose.connection.on('error', console.error.bind(console, "MongoDB Connection error"));

//Setup Mongodb Posts Model
var Post = mongoose.model('Post', {
    title: String,
    post_body: String,
    user_name: String
})

//Add bodyParser to App
app.use(bodyParser.urlencoded({extended: true}));

//Setup handlebars view engine and pass in parameters
app.engine('hbs', hbs({defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine', 'hbs');

//Setup root landing page
app.get('/', function (req, res) {
    res.render('posts-new', {msg: 'Hello World!'})
})

app.listen(8082, function () {
 console.log('Threaddit listening on port 8082!')
})

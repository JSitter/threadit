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
    post_title: String,
    post_body: String,
    user_name: String
})

//Add bodyParser to App to get post data
app.use(bodyParser.urlencoded({extended: true}));

//Setup handlebars view engine and pass in parameters
app.engine('hbs', hbs({defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine', 'hbs');

//Setup root landing page
app.get('/', function (req, res) {
    res.render('posts-new', {msg: 'Hello World!'})
})

//Setup posts/new landing page
app.get('/posts/new', function(req, res){
    res.render('posts-new', { msg: "Remember remember the 5th of September", title: "The Threadit Machine"});
});

//Setup create route to check that form data is sending to proper route
app.post('/create', function(req, res){
    res.send(req.body);
});

//Listen on port 8082
app.listen(8082, function () {
 console.log('Threaddit listening on port 8082!')
})

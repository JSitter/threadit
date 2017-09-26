var express = require('express');
var hbs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();



// connect to threadit database
mongoose.connect('localhost/threadit');

// log database errors to console
mongoose.connection.on('error', console.error.bind(console, "MongoDB Connection error"));

/**************************************
 * Setup Mongodb Posts Model
 *************************************/
var Post = mongoose.model('Post', {
    post_title: String,
    post_content: String,
});

//Add bodyParser to App to get post data
app.use(bodyParser.urlencoded({extended: true}));

// Setup handlebars view engine and pass in parameters
app.engine('hbs', hbs({defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine', 'hbs');

/****************************************************************************
 *              SETUP APP LANDING PAGES
 * 
 * **************************************************************************/

/**************************************
 * Setup root landing page
 *************************************/
app.get('/', function (req, res) {
    res.render('posts-new', {msg: 'Hello World!'});
});

/**************************************
 * Setup posts/new landing page
 *************************************/
app.get('/posts/new', function(req, res){
    res.render('posts-new', {title: "Create Post"});
});

/**************************************
 * Setup View all posts page
 *************************************/
app.get('/posts/all', function(req, res){
    Post.find(function(err, posts){
        res.render('all-posts', { posts: posts, title: "View Posts"});
    });
});

/**************************************
 * Setup Single post Page
 *************************************/
app.get('/posts/:postID', function(req, res){
   
    Post.find({_id: req.params.postID}, function(err, post){
        console.log(post);
        res.render('view-post', {post: post, title:post.post_title});
    });
});

/**************************************
 * Setup User Login page
 *************************************/
app.get('/login', function(req, res){
    res.render('login');
});

/****************************************************************************
 *              SETUP APP POST PAGES
 * 
 * **************************************************************************/

/**************************************
 * Setup 'create' route to check that new post 
 * form data is sending to proper route
 *************************************/
app.post('/create', function(req, res){
    Post.create(req.body, function(){
        res.redirect('/posts/all');
    });
});

var Auth = require('./controllers/auth.js')(app);

// Listen on port 8082
app.listen(8082, function () {
 console.log('Threaddit listening on port 8082!');
});


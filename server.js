/****************************************************
 *      THREADIT
 *      V 1.0.0
 ***************************************************/

var express = require('express');
var hbs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
var app = express();
let jwt = require('jsonwebtoken');


// connect to threadit database
mongoose.connect('localhost/threadit');

//User javascript global promise instead of mongoose's deprecated
mongoose.Promise = global.Promise
 
// log database errors to console
mongoose.connection.on('error', console.error.bind(console, "MongoDB Connection error"));

//Use CookieParser in express app
app.use(cookieParser())

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

/****************************************************
 *  Check login info on every request
 ***************************************************/
var checkAuth = function (req, res, next) {
    
    console.log("\n\n*********Checking authentication********\n\n");
  
    if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
      req.user = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    };
  
    next();
  };

//Authenticate Users on every page load
app.use(checkAuth);

/****************************************************************************
 *              SETUP APP LANDING PAGES
 * 
 * **************************************************************************/

/****************************************************
 *  VIEW SET COOKIES FOR TESTING PURPOSES
 ***************************************************/
app.get('/cookies', (req, res) => {
    res.send(req.cookies);
});

/**************************************
 * Setup root landing page
 *************************************/
app.get('/', function (req, res) {
    console.log(req.cookies);
    res.render('all-posts', {msg: 'Welcome!'});
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
        res.render('view-post', {post: post, title:post.post_title});
    });
});

/**************************************
 * Setup User Login page
 *************************************/
app.get('/login', function(req, res){
    res.render('login');
});

/**************************************
 * Setup User Signup page
 *************************************/
  app.get('/sign-up', function(req, res, next){
    res.render('sign-up');
    //sign-up.hbs submits form to /add-user defined in auth.js
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

  /**************************************
   * Setup 'add-user' POST route
   *************************************/
//   app.post('/add-user', function(req, res, next) {
    
//         // Create User and JWT
//         var user = new User(req.body);
    
//         //console.log(req.body);
    
//         // user.save().then((user)=>{
    
//         // }).catch((err)=>{
    
//         // });
//         // mongoose.Promise = global.Promise <- server.js   
    
//         user.save(function (err) {
//           console.log("Save user")
//           //send 400 on error
//           if (err) { return res.status(400).send({ err: err }) };
    
//           // Encode JWT and set cookie
//           var token = jwt.sign({ _id: 'sampleuserid' }, process.env.SECRET, { expiresIn: "60 days" });
//           res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
    
//           res.redirect('/posts/all');
//         });
    
//       });

/**********************************************
 * Load external files
 *********************************************/
var Auth = require('./controllers/auth.js')(app);


  
  

// Listen on port 8082
app.listen(8082, function () {
 console.log('Threadit listening on port 8082!');
});

//Create partials to load secions in with

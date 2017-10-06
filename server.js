/****************************************************
 *      THREADIT
 *      V 1.0.0
 ***************************************************/

const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();
const jwt = require('jsonwebtoken');

//Require Models
const User = require('./models/user.js');
const Comment = require('./models/comment.js');
const Post = require('./models/post.js');

// connect to threadit database
mongoose.connect('localhost/threadit');

//User javascript global promise instead of mongoose's deprecated
mongoose.Promise = global.Promise;
 
// log database errors to console
mongoose.connection.on('error', console.error.bind(console, "MongoDB Connection error"));

//Use CookieParser in express app
app.use(cookieParser());

//Add bodyParser to App to get post data
app.use(bodyParser.urlencoded({extended: true}));

// Setup handlebars view engine and pass in parameters
app.engine('hbs', hbs({defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine', 'hbs');

/****************************************************
 *  Check for login token on every request
 ***************************************************/
var checkAuth = function (req, res, next) {
    
    console.log("***Authentication Check***");
  
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
    //console.log(req.cookies);

    //get current logged in user id
    var currentUser = req.user;

    Post.find().exec(function (err, posts) {
        res.render('posts-index', { posts: posts , title: "Welcome to Threadit!", currentUser: currentUser});
      });
});

/**************************************
 * Setup User Signup page
 *************************************/
  app.get('/sign-up', function(req, res, next){
      //sign-up.hbs submits form to /add-user defined in auth.js
    res.render('sign-up');
  });

/**************************************
 * Setup User Logout page
 *************************************/
app.get('/logout', function(req, res, next) {
    res.clearCookie('nToken');
  
    res.redirect('/');
  });

/**************************************
 * Setup User Login Page
 *************************************/
app.get('/login', function(req, res, next) {
    res.render('login');
  });

/**************************************
 * Setup User Login Post Functionality
 *************************************/
app.post('/login', function(req, res, next) {
    User.findOne({ username: req.body.username }, "+password", function (err, user) {
      if (!user) { return res.status(401).send({ message: 'Wrong username or password' }) };
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (!isMatch) {
          return res.status(401).send({ message: 'Wrong Username or password' });
        }
  
        var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
  
        res.redirect('/');
      });
    })
  });

/**************************************
 * Setup Subreddits
 *************************************/
app.get('/n/:subreddit', function(req, res) {
    Post.find({ subreddit: req.params.subreddit }, function(err, posts){
        console.log(posts)
        res.render('posts-index', { posts: posts , title: req.params.subreddit});
    })
});

/**************************************
 * Setup Error Page
 *************************************/
app.get('/error', (req, res)=>{
  res.render('error-page')
})
/**************************************
 * Setup 'add-user' POST route
 *************************************/
//This function exists in auth.js

/**********************************************
 * Load Controllers
 *********************************************/
const Auth = require('./controllers/auth.js')(app);
require('./controllers/post.js')(app)

// Listen on port 8082
app.listen(8082, function () {
 console.log('Threadit listening on port 8082!');
});

/****************************************************
 * Threadit
 *    Auth
 ***************************************************/
const jwt = require('jsonwebtoken');

//Load mongodb User Model
var User = require('../models/user.js');


module.exports = (app) => {

  //Set Secret environment variable
  //This should be set elsewhere on production server
  process.env.SECRET = "sEcReTkEy"

  /**************************************
   * Setup 'add-user' POST route
   *************************************/
  app.post('/add-user', function(req, res, next) {

    // Create User and JWT
    var user = new User(req.body);

    //console.log(req.body);

    // user.save().then((user)=>{

    // }).catch((err)=>{

    // });
    // mongoose.Promise = global.Promise <- server.js   

    user.save(function (err) {

      console.log("Save user")
      //send 400 on error
      if (err) { return res.status(400).send({ err: err }) };
      console.log(user.username)
      // Encode JWT and set cookie
      var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      res.redirect('/posts/all');
    });
  });
}
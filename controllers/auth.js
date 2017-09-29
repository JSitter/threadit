/****************************************************
 * Threadit
 *    Auth
 ***************************************************/
var jwt = require('jsonwebtoken');
let user = require('../models/user.js');

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
    if (err) { return res.status(400).send({ err: err }) };
    var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
    
    res.redirect('/posts/all');
    });

   
  });

}
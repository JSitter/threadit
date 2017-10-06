var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app'); //throwing error
var should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server);

var User = require('../models/user');

describe('User', function() {
});

it('should not be able to login if they have not registered', function (done) {
    agent
      .post('/login', { email: "wrong@wrong.com", password: "nope" })
      .end(function (err, res){
        res.status.should.be.equal(401);
        done();
      });
 
  });
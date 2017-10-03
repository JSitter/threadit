var chai = require('chai')
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

describe('Posts', function() {
  it('should create with valid attributes at POST /posts', function (done) {
    // How many tours are there now?
    Tour.find(function(err, tours) {
        var tourCount = tours.count;
    
        var tour = { title: "post title", url: "https://www.google.com", summary: "post summary" }
        chai.request('localhost:3000')
        .post('/tours', tour)
        .end(function (err, res){
    
            // Check that the database has one more tour in it
            Tour.find(function(err, tours) {
            tourCount.should.be.equal(tours + 1);
    
            // Check that the response is a successful
            res.should.have.status(200);
            done();
        });
        });
    });
    // Make a request to create another
    // Check that the database has one more tour in it
    // Check that the response is a successful
  });
});

const chai = require('chai');
const expect = chai.expect;
const Post = require('../models/post.js')
const User = require('../models/user')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



it('should return array of posts', (done) => {

    Post.find({}).then((posts) => {
        expect(posts).to.be.an("array")
        done()
    }).catch((err) => {
        done(err)
    })
});

var newPost;
before(() => {
    mongoose.connect('localhost/threadit');
})
after((done) => {
    Post.findByIdAndRemove(newPost._id).then((message) => {
        console.log("fine by id and remove completed")
        done()
    }).catch((err) => {
        done(err)
    })
    console.log("After Completed")
})

//Should return an array of posts
it('should return array of posts', (done) => {
    newPost = crPost()

    newPost.save().then((post) => {
        return Post.findById(post._id)
    }).then((post) => {
        expect(post._id.toString()).to.be.equal(newPost._id.toString())
        done();
    }).catch((err) => {
        done(err)
    })

});

//- Should add a new post
it('should add a new post', (done) => {
    numberOfPosts = 0
    Post.find({}).then((posts) => {
        numberOfPosts = posts.length
    })
    newPost = crPost()
    Post.find({}).then((posts) => {
        expect(posts.length).to.be.equal(numberOfPosts)
        done()
    }).catch((err) => {
        done(err)
    })
})

//- should fetch a post with valid properties
it('Should fetch a post with valid properties', (done) => {

    Post.findOne({ title: "My Title" }).then((postr) => {
        expect(postr).to.have.property('title')
        expect(postr).to.have.property('url')
        expect(postr).to.have.property('summary')
        expect(postr).to.have.property('content')
        expect(postr).to.have.property('comments')
        expect(postr).to.have.property('subreddit')
        done()
    }).catch((err) => {
        done(err)
    })
})

//- TODO: should create a new user
// it("Should create a new user", (done)=>{

// })

//- Should find a user with an id
//- should find a user with valid properties
//- should remove a user

let crPost = () => {
    return new Post({ title: "My Title", url: "url", subreddit: "my", summary: "" })
}
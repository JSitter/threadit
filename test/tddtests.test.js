
const chai = require('chai');
const expect = chai.expect;
const Post = require('../models/post.js')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('localhost/threadit');

it('should return array of posts', (done)=>{

    Post.find({}).then((posts)=>{
        expect(posts).to.be.an("array")
        done()
    }).catch((err)=>{
        done(err)
    })
});

var newPost;
before(()=>{
    
})
after((done)=>{
    Post.findByIdAndRemove( newPost._id).then((message)=>{
        console.log("fine by id and remove completed")
        done()
    }).catch((err)=>{
        done(err)
    })
    console.log("After Completed")
})

//Should return an array of posts
it('should return array of posts', (done)=>{
    newPost = crPost()

    newPost.save().then((post)=>{
        return Post.findById(post._id)
    }).then((post)=>{
        expect(post._id.toString()).to.be.equal(newPost._id.toString())
        done();
    }).catch((err)=>{
        done(err)
    })
    

});

//- Should add a new post
it('should add a new post', (done)=>{
    newPost = crPost()
    
})

//- should fetch a post with valid properties
//- should create a new user
//- Should find a user with an id
//- should find a user with valid properties
//- should remove a user

let crPost = ()=>{
    return new Post({title: "My Title", subreddit: "my"})
}
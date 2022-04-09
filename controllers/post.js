/****************************************************
 * Threadit
 *    Post Controller
 ***************************************************/
module.exports = (app) => {

    //Load mongodb Models
    const Post = require('../models/post.js')
    const Comment = require('../models/comment.js');
    const User = require('../models/user.js');
    app.put('/posts/:id/vote-up', function (req, res) {
        //check if user is logged in
        if (!req.user) {
            console.log("User must be signed in to vote.")
            res.status(400).send("User not signed in")
        } else {
            Post.findById(req.params.id).then(() => {

                console.log("upvoat uid:", req.user._id)
            }).catch((err) => {
                console.log("upvote error:", err.message)
                res.status(400).send(err.message)
            })
        }

    })

    app.put('/posts/:id/vote-down', function (req, res) {
        console.log("DownGoat")
        Post.findById(req.params.id).exec(function (err, post) {
            //post.downVotes.push(req.user._id)
            //post.voteScore = post.voteTotal - 1
            //post.save();

            res.status(200);
        })
    })

    /**************************************
     * Setup Single post Page
     *************************************/
    app.get('/post/:postID', function (req, res) {

        Post.findById(req.params.postID)
            .lean()
            .populate(
                {
                    path: 'comments',
                    model: 'Comment',
                    populate: {
                        path: 'author',
                        model: 'User'
                    }
                }
            ).populate('author').then((post) => {
                console.log("Post id path")
                res.render('view-post', { post });
            }).catch((err) => {
                console.log("\n*******Error getting post ******** \n", err.message);
                res.status(404).render("/error", { error: err.message })
            });
    });

    /**************************************
     * retrieve submitted comments
     *************************************/
    app.post('/post/:postID/comments', function (req, res) {

        if (req.user === null) {
            res.redirect('/login')
        }

        let post;

        Post.findById(req.params.postID).then((p) => {
            post = p;
            const author = req.user._id
            const comment = req.body.comment

            let commentObj = new Comment({ comment, author });
            return commentObj.save()
        }).then((comment) => {
            post.comments.unshift(comment)
            return post.save();
        }).then((post) => {
            res.redirect(`/post/${post._id}`)
        }).catch((err) => {
            console.log("**Error creating comment: ", err.message);
        })

    });

    /**************************************
     * Setup 'create' to create new post
     * from user input
     *************************************/
    app.post('/create', function (req, res) {
        console.log(req.body)
        const currentUser = req.user;

        //if user isn't logged in redirect to login page
        if (currentUser === null) {
            res.redirect('/login')
        }

        const title = req.body.title
        const url = req.body.url
        const subreddit = req.body.subreddit
        const summary = req.body.summary
        const content = req.body.content
        const user = req.user._id

        Post.create({
            title,
            url,
            summary,
            content,
            subreddit,
            author: user
        }).then((post) => {
            return post.save()
        }).then((post) => {
            console.log("Post saved")
            res.redirect(`/post/${post._id}`)
        }).catch((err) => {
            console.log("**Error creating post ", err.message)
        })
    });

    /**************************************
     * Setup View all posts page
     *************************************/
    app.get('/posts/all', function (req, res) {

        //get current logged in user id
        var currentUser = req.user;

        Post.find({})
            .lean()
            .exec(function (error, posts) {
                res.render('all-posts',
                    {
                        posts: posts,
                        title: "View Posts",
                        currentUser: currentUser
                    }
                );
            })
    });

    /**************************************
     * Setup posts/new landing page
     *************************************/
    app.get('/posts/new', function (req, res) {
        //get current logged in user id
        var currentUser = req.user;
        console.log(currentUser)
        res.render('posts-new', { title: "Create Post" });
    });

}
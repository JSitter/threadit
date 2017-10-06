/****************************************************
 * Threadit
 *    Post Controller
 ***************************************************/
module.exports = (app) => {

    //Load mongodb Post Model
    const Post = require('../models/post.js')
    /**************************************
     * Setup Single post Page
     *************************************/
    app.get('/posts/:postID', function(req, res, next){
        
            Post.findById(req.params.postID).populate( 'comments' ).exec().then( (post)=>{
                console.log(post);
                res.render('view-post',  { post } );
            }).catch(( err )=>{
                console.log( err );
                //res.redirect("/404"...)
            });
        });

    /**************************************
     * retrieve submitted comments
     *************************************/
    app.post('/posts/:postID/comments', function (req, res) {
        
            // INSTANTIATE INSTANCE OF MODEL
            const comment = new Comment(req.body);
            console.log("new comment body:", req.body)
            Post.findById(req.params.postID).exec(function (err, post) {
                
                comment.save(function (err, comment) {
                    console.log("comment",comment)
                    post.comments.unshift(comment);
                    post.save();
            
                return res.redirect(`/posts/` + post._id);
                })
            });
        });

    /**************************************
     * Setup 'create' route to check that new post 
     * form data is sending to proper route
     *************************************/
    app.post('/create', function(req, res){
        //console.log(req.body)
        Post.create(req.body, function(){
            res.redirect('/posts/all');
        });
    });

    /**************************************
     * Setup View all posts page
     *************************************/
    app.get('/posts/all', function(req, res){
        
            //get current logged in user id
            var currentUser = req.user;
        
            Post.find(function(err, posts){
                res.render('all-posts', { posts: posts, title: "View Posts", currentUser: currentUser});
            });
        });

    /**************************************
     * Setup posts/new landing page
     *************************************/
    app.get('/posts/new', function(req, res){
        res.render('posts-new', {title: "Create Post"});
    });

}
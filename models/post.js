var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**************************************
 * Setup Mongodb Posts Model
 *************************************/
const PostSchema = new Schema({
    title       : String,
    url         : String,
    summary     : String,
    content     : String,
    comments    : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    subreddit   : { type: String, required: true },
    author      : { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Post', PostSchema);
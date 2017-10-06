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
    author      : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments    : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    subreddit   : { type: String, required: true }
});

module.exports = mongoose.model('Post', PostSchema);

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var CommentSchema = new Schema({
    comment     : { type: String, required: true },
    author      : { type: Schema.Types.ObjectId, ref: 'User', required: true }
    });

module.exports = mongoose.model('Comment', CommentSchema);

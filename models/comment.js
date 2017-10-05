
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var CommentSchema = new Schema({
    comment: { type: String, required: true }
    });

module.exports = mongoose.model('Comment', CommentSchema);

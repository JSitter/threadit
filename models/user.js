var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
createdAt       : { type: Date }
, updatedAt       : { type: Date }

, password        : { type: String, select: false }
, username        : { type: String, required: true }
});

UserSchema.pre('save', function(next){
console.log("HELP!")
// SET createdAt AND updatedAt
var now = new Date();
this.updatedAt = now;
if ( !this.createdAt ) {
this.createdAt = now;
}
});

module.exports = mongoose.model('User', UserSchema);
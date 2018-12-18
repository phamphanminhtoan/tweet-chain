var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'publicKey' : String,
	'name' : String,
	'post' : Array,
	'picture' : String,
	'following' : Array,
	'payment' : Array
});

module.exports = mongoose.model('user', userSchema);

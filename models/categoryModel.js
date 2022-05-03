var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var categorySchema = new Schema({
	name : {
		type :String,
		minlength : 2
	}
}, {timestamps : true});

module.exports = mongoose.model('category', categorySchema);

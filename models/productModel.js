var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var productSchema = new Schema({
	name : {
		type : String,
		minlength : 4
	},
	descr : {
		type : String,
		minlength : 4
	},
	price: {
		type : Number,
	},
	image : {
		type : Number,
	},
	category : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'categoryModel'
	}
}, {timestamps : true});

module.exports = mongoose.model('product', productSchema);

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const orderItem = new Schema({
	productId: {
		type: Schema.Types.ObjectId,
	 	ref: 'productModel'
	},
	quantity : {
		type: Number,
	}
});

const orderSchema = new Schema({
	orderDate : 
	{
		type: Date,
		default : new Date()
	},
	orderSum : {
		type:Number 
	}, 
	userId : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	orderItems : [orderItem]
}, {timestamps : true});

module.exports = mongoose.model('order', orderSchema);

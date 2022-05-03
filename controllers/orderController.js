const { ObjectId } = require('mongodb');
const orderModel = require('../models/orderModel.js');

module.exports.create = async function (req, res, next){
    try {
        const order = req.body;
        const { orderDate, orderSum, userId, orderItems } = order;
        const orderToSave = new OrderModel({ orderDate: orderDate, orderSum: orderSum, userId: userId, orderItems: orderItems });
        const inserted = await orderToSave.save();
        res.send(inserted);
    }
    catch (error) {
        next(error);
    }
}
module.exports.getOneOrder = async function(req, res, next){
    const id = req.params.id;
    try {
        let order = await orderModel.findById(ObjectId(id)).populate('userId');
        res.send(order);
    }
    catch (error) {
        next(error);
    }
}
exports.getallOrders = async function (req, res, next) {
    try {
        const orders = await orderModel.find();
        res.send(orders);
    }
    catch (error) {
        next(error);
    }
}
exports.deleteOrderById = async function (req, res, next) {
    try {
        const id = req.params.id;
        const order = await orderModel.deleteOne({ _id: ObjectId(id) });
        res.send(order);
    }
    catch (error) {
        next(error);
    }

}
exports.updateOrderById = async function (req, res, next) {
    console.log("in update");
    try {
        const id = req.params.id;
        const order = req.body;
        const { orderDate, orderSum, userId, orderItems } = order;
        const userToUpdate = {
            orderDate: orderDate,
            orderSum: orderSum,
            userId: userId,
            orderItems: orderItems
        }
        const updated = await orderModel.findByIdAndUpdate(id, userToUpdate, { new: true });
        res.send(updated);
    }
    catch (error) {
        next(error);
    }
}



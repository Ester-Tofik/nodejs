const ProductModel = require('../models/productModel.js');
const { ObjectId } = require('mongodb');

module.exports.list = async function (req, res, next) {
    try {
        const products = await ProductModel.find();
        res.send(products);
    }
    catch (err) {
        next(error);
    };
}
module.exports.show = async function (req, res, next) {
    try {
        const Categoryid = req.params.id;
        const products = await ProductModel.find({category:Categoryid });
        res.send(products);
    }
    catch (err) {
        next(err);
    };
}
exports.post = async function (req, res, next) {
    try {
        const product = new ProductModel(req.body);
        const inserted = await product.save();
        res.send(inserted);
    }
    catch (error) {
        next(error);
    }
}
exports.deleteProductById = async function (req, res, next) {
    try {
        const id = req.params.id;
        const product = await ProductModel.deleteOne({ _id: ObjectId(id) });
        res.send(product);
    }
    catch (error) {
        next(error);
    }

}
exports.updateProductById = async function (req, res, next) {
    try {
        const id = req.params.id;
        const product = req.body;
        const { name, descr, price, image, category } = product;
        const productToUpdate = {
            name: name,
            descr: descr,
            price: price,
            image: image,
            category: category
        }
        const updated = await ProductModel.findByIdAndUpdate({ _id: id }, productToUpdate);
        res.send(updated);
    }
    catch (error) {
        next(error);
    }
}
const CategoryModel = require('../models/categoryModel.js');
const { ObjectId } = require('mongodb');

module.exports.list = async function (req, res, next) {



    
    try {
        const categories = await CategoryModel.find();
        res.send(categories);
    }
    catch (err) {
        next(error);
    };
}

exports.postCategory = async function(req, res) {
    let newCategory = new CategoryModel(req.body);
    let saved = await newCategory.save();
    res.send(saved);
}


 exports.updateCategoryById = async function (req, res,next) {
    try {
        const id = req.params.id;
        const category = req.body;
        const { name} = category;
        const categoryToUpdate={
            name:name
        }        
        const updated = await CategoryModel.findByIdAndUpdate(id,categoryToUpdate,{ new: true });
        res.send(updated);
    }
    catch (error) {
        next(error);
    }
}

exports.deleteCategoryById = async function (req, res,next) {
    try {
        const id = req.params.id;
        const category = await CategoryModel.deleteOne({ _id: ObjectId(id) });
        res.send(category);
    }
    catch (error) {
        next(error);
    }

}





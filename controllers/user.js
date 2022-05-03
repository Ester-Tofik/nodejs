const userModel = require('../models/user');
const { ObjectId } = require('mongodb');
const logger = require('../logs/configuration');

module.exports.getOneUser = async function (req, res, next) {
    try {
        const email = req.params.email;
        const password = req.params.password;
        const users = await userModel.findOne({ email: email, password: password });
        res.send(users);
    }
    catch (error) {
        next(error);
    }
};

module.exports.getOneUserWithOrders = async function (req, res, next) {
    try {
        const id = req.params.id;
        const users = await userModel.findOne({ _id : '6243334bdd417ce9e7626bcc'}).populate({path : 'orders'});
        res.send(users.orders);
    }
    catch (error) {
        next(error);
    }
};

module.exports.getAllUsers = async function (req, res, next) {
    try {
        const users = await userModel.find();
        res.send(users);
    }
    catch (error) {
        next(error);
    }
};

module.exports.putUser = async function (req, res, next) {
    try {
        const id = req.params.id;
        const user = req.body;
        const { firstName, lastName, email, password,  adresses } = user;
        const userToUpdate = { $set: { "firstName": firstName, "lastName": lastName, "email": email, "password": password ,"adresses":adresses }};
        const update = { _id: ObjectId(id) };
        const userTo = await userModel.updateOne(update, userToUpdate);
        res.send(userTo);
    }
    catch (error) {
        next(error);
    }
};

module.exports.postUser = async function (req, res, next) {
    if (req.body) {
        try {
            const user = req.body;
            const { firstName, lastName, email, password, adresses } = user;
            const userToSave = new userModel({ firstName: firstName, lastName: lastName, email: email, password: password, adresses:adresses });
            const inserted = await userToSave.save();
            res.send(inserted);
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports.deleteUser = async function (req, res, next) {
    try {
        const id = req.body.id;
        const inserted = await userModel.deleteOne({ "id": id });
        res.send(inserted);
    }
    catch (error) {
        next(error);
    }
};

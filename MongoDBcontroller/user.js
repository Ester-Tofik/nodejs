const { ObjectId } = require('mongodb');
const db = require('../DB/db');

exports.getOneUser = async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const user = await db.getDB().collection('users').findOne({ email: email, password: password })
    await res.send(user)
};

exports.getAllUsers = async function (req, res) {
    const users = await db.getDB().collection('users').find().toArray();
    await res.send(users);
};

exports.putUser = async function (req, res) {
    const id = req.params.id;
    const user = req.body;
    const { firstName, lastName, email, password } = user;
    const userToUpdate = {$set:{ "firstName": firstName, "lastName": lastName, "email": email, "password": password }};
    const update = { _id :  ObjectId(id)};
   const userTo = await db.getDB().collection('users').updateOne(update, userToUpdate );
    await res.send(userTo);
};

exports.postUser = async function (req, res) {
    if (req.body) {
        const user = req.body;
        const { firstName, lastName, email, password } = user;
        const userToSave = { firstName: firstName, lastName: lastName, email: email, password: password };
        const inserted = await db.getDB().collection('users').insertOne(userToSave);
        await res.send(inserted);
    }
}

exports.deleteUser = async function (req, res) {
    const id = req.body.id;
    const inserted = await db.getDB().collection('users').deleteOne({ "id": id });
    await res.send(inserted);
};





const db = require('../DB/db');

exports.getAllCategories = async function (req, res) {
    const categories = await db.getDB().collection('categories').find().toArray();
    await res.send(categories);
};
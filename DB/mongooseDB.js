const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectionString = process.env.CONNECTION_STRING;

class mongooseDB {

    constructor() { }

    async connect() {
        await mongoose.connect(connectionString);
        console.log("DB Connected!")
    }

}
module.exports =new mongooseDB();
const { MongoClient } = require('mongodb');



//const client = new MongoClient(connectionString);

class dataBase {

  constructor() { }

  async connect() {
    const client = new MongoClient(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    let connected = await client.connect();
    this.db = connected.db("325202349_ST_AYALA");
    console.log("DB Connected!")
  };

  getDB() {
    return this.db;
  }
}


module.exports = new dataBase();
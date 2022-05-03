const express = require('express');
const app = express();
// const db = require('./DB/db');
const mongooseDB = require('./DB/mongooseDB');
const category = require('./Routes/categoryRoutes');
const user1 = require('./Routes/User');
const product = require('./Routes/productRoutes');
const order = require('./Routes/orderRoutes');
const logger = require('./logs/configuration');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const path= require('path')

app.use(express.json());
app.use(express.static('static'));
app.use('/api/User', user1);
app.use('/api/category', category);
app.use('/api/product', product);
app.use('/api/order', order);
app.use((err, req, res, next) => {
    if(process.env.ENVIRONMENT == 'development')
        logger.error(err.message);
    res.status(500).send('something broke!');
});
app.use((req, res)=>{
    console.log("page not found");
    res.status(404).sendFile(path.join(__dirname, './static/html/404.html'));
})
mongooseDB.connect();
mongoose.set('toJSON', { virtual: true })

app.listen(port, () => {
    if(process.env.ENVIRONMENT == 'development')
        logger.info(`we love iceCream❤🤣😂 ${port}`);
});





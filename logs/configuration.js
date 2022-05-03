const winston = require('winston');
require('winston-mongodb');
const dotenv = require('dotenv');
dotenv.config();
const connectionString = process.env.CONNECTION_STRING;

const logConfiguration = {
    transports : [
        new winston.transports.Console ({
            level : 'info'
        }),
        new winston.transports.File({
            level : 'error', 
            filename : 'logs/logger.log'
        }),
        new winston.transports.MongoDB({
            level:'error',
            db: connectionString,
            options: {
                useUnifiedTopology: true
            },
            collection: 'server_logs'
        })
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `${info.level}: ${info.timestamp}: ${info.message} `)
    )
}

const logger = winston.createLogger(logConfiguration);
module.exports = logger;
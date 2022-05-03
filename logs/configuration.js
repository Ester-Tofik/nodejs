const winston = require('winston');
require('winston-mongodb');

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
            db:'mongodb://srv1:27017/325202349_ST_AYALA',
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
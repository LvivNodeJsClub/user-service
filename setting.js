const env = process.env.NODE_ENV || 'development';

require('dotenv').load({path: `.env.${env}`});

module.exports = {
    ENVIRONMENT: env,

    PORT:        process.env.PORT || 3000,

    DB_HOST:     process.env.DB_HOST || 'localhost',
    DB_PORT:     process.env.DB_PORT || 5432,
    DB_USER:     process.env.DB_USER || 'user',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_NAME:     process.env.DB_NAME || 'user-service',

};

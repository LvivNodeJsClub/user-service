const setting = require('app/setting');

module.exports = {
    test:        {
        client:     'pg',
        version:    '7.2',
        connection: {
            host:     setting.DB_HOST,
            port:     setting.DB_PORT,
            user:     setting.DB_USER,
            password: setting.DB_PASSWORD,
            database: setting.DB_NAME
        },
        migrations: {
            directory: 'database/migrations',
            tableName: 'migrations'
        },
        pool:       {
            min: 0,
            max: 5
        }
    },
    development: {
        client:     'pg',
        version:    '7.2',
        connection: {
            host:     setting.DB_HOST,
            port:     setting.DB_PORT,
            user:     setting.DB_USER,
            password: setting.DB_PASSWORD,
            database: setting.DB_NAME
        },
        migrations: {
            directory: 'database/migrations',
            tableName: 'migrations'
        },
        pool:       {
            min: 0,
            max: 10
        }
    },
    production:  {
        client:     'pg',
        version:    '7.2',
        connection: {
            host:     setting.DB_HOST,
            port:     setting.DB_PORT,
            user:     setting.DB_USER,
            password: setting.DB_PASSWORD,
            database: setting.DB_NAME
        },
        migrations: {
            directory: 'database/migrations',
            tableName: 'migrations'
        },
        pool:       {
            min: 0,
            max: 20
        }
    },
};

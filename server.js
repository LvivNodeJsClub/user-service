require('rootpath')();

const knex = require('database/knex');

knex.migrate.latest()
.then(function() {
    console.log('Migration done!');

    require('runner');
})
.catch(function() {
    console.error('Migration failed!');
});
require('rootpath')();

const knex = require('database/knex');

// FIXME https://stackoverflow.com/questions/35069027/docker-wait-for-postgresql-to-be-running
var i=0;
while (i<10000000000) {
    i++;
}
knex.migrate.latest()
.then(function() {
    console.log('Migration done!');

    require('runner');
})
.catch(function(error) {
    console.error(error);
});

const setting     = require('setting');
const environment = setting.ENVIRONMENT;
const config      = require('database/config')[environment];

console.debug(`Use environment: ${environment}`);

module.exports = require('knex')(config);
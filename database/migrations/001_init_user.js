exports.up = function(knex) {
    return knex.schema.createTable('Users', (table) => {
        table.increments().primary();
        table.string('name').notNullable().comment('This is the user name field');
        table.string('email').notNullable().unique().comment('This is the email field');
        table.string('login').notNullable().unique().comment('This is the login field');
        table.string('password').notNullable().comment('This is the password field');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('Users');
};

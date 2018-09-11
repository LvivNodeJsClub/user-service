exports.up = function(knex) {
    return knex.schema.createTable('Users', (table) => {
        table.increments().primary();
        table.string('name').notNull();
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('Users');
};

exports.up = function(knex) {
    return knex.schema.createTable('Groups', (table) => {
        table.increments().primary();
        table.string('name').notNullable().unique().comment('This is the group name field');
        table.boolean('admin').notNullable().defaultTo(false).comment('This is the admin flag field');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('Groups');
};

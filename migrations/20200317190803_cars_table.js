
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl
        .increments();

      tbl
        .string('VIN', 17)
        .notNullable()
        .unique()
        .index();

      tbl
        .string('make', 128)
        .notNullable();
        
      tbl
        .string('model', 128)
        .notNullable();
      
      tbl
        .string('mileage', 128)
        .notNullable();  
      
      tbl
        .boolean('manual_transmission');

      tbl
        .string('title_status');  
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};

const db = require('../db');

(async () => {
    try {
        await db.schema.dropTableIfExists('users');
        await db.schema.withSchema('public').createTable('users', (table) => {
            table.integer("id").primary();
            table.string('username').unique();
            table.string("password").notNullable();
            table.string("first_name").notNullable();
            table.string("last_name").notNullable();
            table.string("email").notNullable();
        });
        
        await db.schema.dropTableIfExists('weather_reports');
        await db.schema.withSchema('public').createTable('weather_reports', (table) => {
            table.integer("id").primary();
            table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
            table.string("city");
            table.string("region");
            table.string("country");
        });

        await db.schema.dropTableIfExists('weather_recents');
        await db.schema.withSchema('public').createTable('weather_recents', (table) => {
            table.integer("id").primary();
            table.string("city");
            table.string("region");
            table.string("country");
        });

        await db.schema.dropTableIfExists('location_recents');
        await db.schema.withSchema('public').createTable('location_recents', (table) => {
            table.integer("id").primary();
            table.string("address");
        });

        process.exit(0);
   } catch (err) {
      console.log(err)
      process.exit(1)
  }
})()
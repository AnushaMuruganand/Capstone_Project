"use strict";
/** Database setup for map and weather. */
const { Client } = require("pg");
const knex = require('knex');
const { getDatabaseUri } = require("./config");

// let db;

// if (process.env.NODE_ENV === "production") {
//   db = new Client({
//     connectionString: getDatabaseUri(),
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });
// } else {
//   db = new Client({
//     connectionString: getDatabaseUri()
//   });
// }

// db.connect();

const db = knex({
    client: 'pg',
    connection: {
      connectionString: getDatabaseUri(),
      ssl: {
        rejectUnauthorized: false
      }
    }
});

module.exports = db;
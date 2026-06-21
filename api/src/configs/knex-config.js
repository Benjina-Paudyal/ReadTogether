import knex from "knex";
import "dotenv/config";

export function createKnexConfig() {
  return {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT || 5432),
      /* ssl: { rejectUnauthorized: false }, */
    },

        migrations: {
      directory: "./src/db/migrations",
      loadExtensions: [".js"],
    },

    seeds: {
      directory: "./src/db/seeds",
      loadExtensions: [".js"],
    },
  };
}

const connection = knex(createKnexConfig());

export default connection;

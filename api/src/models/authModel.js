import knex from "../database_client.js";

export const AuthModel = {
    // check existance of email 
    async findByEmail(email) {
    return knex("Users").where({ email }).first();
  },
};
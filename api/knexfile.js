import "dotenv/config";
import { createKnexConfig } from "./src/configs/knex-config.js";

const config = createKnexConfig();

export default {
  development: config,
  production: config,
};

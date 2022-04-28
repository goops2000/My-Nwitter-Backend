import { Sequelize } from "sequelize-typescript";
import { config } from "../config/config";
import { Order } from "./order";
import { Tweets } from "./tweets";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: config.development.host,
  username: config.development.username,
  password: config.development.password,
  database: config.development.database,
  logging: false,
  models: [Tweets],
});

export default sequelize;
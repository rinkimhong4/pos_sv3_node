const dbConfig = require("../configs/database");
const Sequelize = require("sequelize");

let sequelize = null;
let dbName = dbConfig.database;
let dbUser = dbConfig.user;
let dbPassword = dbConfig.password;

if (!sequelize) {
  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
  });
}

let db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Category = require("../models/category.model")(sequelize, Sequelize);
db.OrderDetail = require("../models/order.detail.model")(sequelize, Sequelize);
db.Order = require("../models/order.model")(sequelize, Sequelize);
db.Product = require("../models/product.model")(sequelize, Sequelize);
db.User = require("../models/user.model")(sequelize, Sequelize);

module.exports = db;

module.exports = {
  host: "localhost",
  user: "root",
  password: "",
  database: "pos_sv3",
  dialect: "mysql",
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

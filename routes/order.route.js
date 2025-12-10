const orderController = require("../controllers/order.controller");

const order = (app) => {
  app.get("/api/order", orderController.findAll);
};

module.exports = { order };

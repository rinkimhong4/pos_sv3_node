const orderDetailController = require("../controllers/orderdetail.controller");

const orderDetail = (app) => {
  app.get("/api/orderDetail", orderDetailController.findAll);
};

module.exports = { orderDetail };

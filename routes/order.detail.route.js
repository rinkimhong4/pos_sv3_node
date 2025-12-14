const orderDetailController = require("../controllers/orderdetail.controller");

const orderDetail = (app) => {
  app.get("/api/orderDetail", orderDetailController.findAll);
  app.get("/api/orderDetail/:id", orderDetailController.findById);

  // post
  app.post("/api/orderDetail/create", orderDetailController.create);
  app.put("/api/orderDetail/update/:id", orderDetailController.update);
  app.delete("/api/orderDetail/delete/:id", orderDetailController.delete);
};

module.exports = { orderDetail };

const orderController = require("../controllers/order.controller");

const order = (app) => {
  app.get("/api/order", orderController.findAll);

  app.get("/api/order/:id", orderController.findById);

  // post
  app.post("/api/order/create", orderController.create);
  app.put("/api/order/update/:id", orderController.update);
  app.delete("/api/order/delete/:id", orderController.delete);
};

module.exports = { order };

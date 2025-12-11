const productController = require("../controllers/product.controller");

const product = (app) => {
  app.get("/api/product", productController.findAll);
  app.get("/api/product/:id", productController.findById);
  app.get("/api/product/search/:name", productController.searchByName);

  // post
  app.post("/api/product/create", productController.create);
  app.put("/api/product/update/:id", productController.update);
  app.delete("/api/product/delete/:id", productController.delete);
};

module.exports = { product };

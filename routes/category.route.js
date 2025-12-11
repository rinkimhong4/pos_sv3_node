const categoryController = require("../controllers/category.controller");

const categories = (app) => {
  // get
  app.get("/api/categories", categoryController.findAll);
  app.get("/api/categories/:id", categoryController.findById);
  app.get("/api/categories/search/:name", categoryController.searchByName);

  // post
  app.post("/api/categories/create", categoryController.create);
  app.put("/api/categories/update/:id", categoryController.update);
  app.delete("/api/categories/delete/:id", categoryController.delete);
};

module.exports = { categories };

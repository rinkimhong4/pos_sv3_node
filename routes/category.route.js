const categoryController = require("../controllers/category.controller");

const categories = (app) => {
  app.get("/api/categories", categoryController.findAll);
};

module.exports = { categories };

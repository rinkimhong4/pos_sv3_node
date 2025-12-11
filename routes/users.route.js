const userController = require("../controllers/user.controller");

const user = (app) => {
  app.get("/api/user", userController.findAll);
};

module.exports = { user };

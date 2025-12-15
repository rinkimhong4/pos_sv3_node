const userController = require("../controllers/user.controller");

const user = (app) => {
  // get
  app.get("/api/user", userController.findAll);
  app.get("/api/user/:id", userController.getUserById);
  app.get("/api/user/search/:name", userController.search);
  // delete
  app.delete("/api/user/delete/:id", userController.delete);

  // create and login
  app.post("/api/user/create", userController.create);
  app.post("/api/user/login", userController.login);

  //  update
  app.put("/api/user/update/:id", userController.update);
};

module.exports = { user };

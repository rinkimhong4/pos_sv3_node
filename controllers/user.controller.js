const db = require("../services/DBContext");
const user = db.User;

exports.findAll = async (req, res) => {
  try {
    const users = await user.findAll();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

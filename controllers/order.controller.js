const db = require("../services/DBContext");
const ord = db.Order;

//  Get ALL teachers
exports.findAll = async (req, res) => {
  try {
    const order = await ord.findAll();
    res.json(order);
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

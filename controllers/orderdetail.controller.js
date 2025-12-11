const db = require("../services/DBContext");
const ordD = db.OrderDetail;

exports.findAll = async (req, res) => {
  try {
    const orderDetail = await ordD.findAll();
    res.json(orderDetail);
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

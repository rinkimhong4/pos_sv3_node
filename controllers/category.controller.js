const db = require("../services/DBContext");
const cat = db.Category;

//  Get ALL teachers
exports.findAll = async (req, res) => {
  try {
    const category = await cat.findAll();
    res.json(category);
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

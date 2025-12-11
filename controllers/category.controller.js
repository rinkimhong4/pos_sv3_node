const db = require("../services/DBContext");
const cat = db.Category;

exports.findAll = async (req, res) => {
  try {
    const category = await cat.findAll();
    res.json(category);
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

exports.findById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await cat.findByPk(id);
    if (!data) return res.status(404).json({ message: "Category not found" });
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

exports.searchByName = async (req, res) => {
  const categoryName = req.params.name;
  try {
    const category = await cat.findOne({
      where: { CategoryName: categoryName },
    });

    if (!category) {
      return res
        .status(404)
        .json({ message: `Category with name '${categoryName}' not found` });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message || "Some error occurred" });
  }
};
exports.create = async (req, res) => {
  try {
    const { CategoryName } = req.body;

    const existName = await cat.findOne({
      where: { CategoryName },
    });

    if (existName) {
      return res.status(400).json({
        message: "Category name already exists",
      });
    }

    const createdCategory = await cat.create(req.body);
    res.status(201).json({
      message: "Category Create successfully",
      createdCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const findID = await cat.findByPk(id);
    if (!findID) return res.status(404).json({ message: "Category not found" });

    await findID.update(req.body);
    res.json({
      message: "Category updated successfully",
      findID,
    });
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await cat.findByPk(id);
    if (!data) return res.status(404).json({ message: "Category not found" });
    await data.destroy();
    res.json({
      message: "Category deleted successfully",
      data,
    });
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

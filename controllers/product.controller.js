const db = require("../services/DBContext");
const products = db.Product;

exports.findAll = async (req, res) => {
  try {
    const product = await products.findAll();
    res.json({
      count: product.length,
      product,
    });
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

exports.findById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await products.findByPk(id);
    if (!data) return res.status(404).json({ message: "Product not found" });
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

exports.searchByName = async (req, res) => {
  const productName = req.params.name;
  try {
    const product = await products.findOne({
      where: { ProductName: productName },
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with name '${productName}' not found` });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message || "Some error occurred" });
  }
};
exports.create = async (req, res) => {
  try {
    const { ProductName } = req.body;

    const existName = await products.findOne({
      where: { ProductName },
    });

    if (existName) {
      return res.status(400).json({
        message: "Product name already exists",
      });
    }

    const createdProduct = await products.create(req.body);
    res.status(201).json({
      message: "Product Create successfully",
      createdProduct,
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
    const findID = await products.findByPk(id);
    if (!findID) return res.status(404).json({ message: "Product not found" });

    await findID.update(req.body);
    res.json({
      message: "Product updated successfully",
      findID,
    });
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await products.findByPk(id);
    if (!data) return res.status(404).json({ message: "Product not found" });
    await data.destroy();
    res.json({
      message: "Product deleted successfully",
      data,
    });
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

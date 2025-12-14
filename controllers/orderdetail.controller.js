const db = require("../services/DBContext");
const ordD = db.OrderDetail;

const Product = db.Product;
const Order = db.Order;

exports.findAll = async (req, res) => {
  try {
    const orderDetail = await ordD.findAll();
    res.json(orderDetail);
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

exports.findById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ordD.findByPk(id);
    if (!data) return res.status(404).json({ message: "Order  not found" });
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

exports.create = async (req, res) => {
  try {
    const { OrderID, ProductID, Qty, Discount } = req.body;

    if (!OrderID || !ProductID || !Qty) {
      return res.status(400).json({
        message: "OrderID, ProductID, and Qty are required",
      });
    }

    const orderExist = await Order.findByPk(OrderID);
    if (!orderExist) {
      return res.status(404).json({ message: "OrderID not found" });
    }

    const productExist = await Product.findByPk(ProductID);
    if (!productExist) {
      return res.status(404).json({ message: "ProductID not found" });
    }

    const createdDetail = await ordD.create({
      OrderID,
      ProductID,
      Qty,
      Discount: Discount || 0,
    });

    res.status(201).json({
      message: "OrderDetail created successfully",
      data: createdDetail,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Some error occurred",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const findID = await ordD.findByPk(id);
    if (!findID)
      return res.status(404).json({ message: "Order Detail not found" });

    await findID.update(req.body);
    res.json({
      message: "Order updated successfully",
      findID,
    });
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ordD.findByPk(id);
    if (!data) return res.status(404).json({ message: "Order not found" });
    await data.destroy();
    res.json({
      message: "Order deleted successfully",
      data,
    });
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

const db = require("../services/DBContext");
const ord = db.Order;
const User = db.User;

exports.findAll = async (req, res) => {
  try {
    const order = await ord.findAll();
    res.json(order);
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

exports.findById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ord.findByPk(id);
    if (!data) return res.status(404).json({ message: "Order  not found" });
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};
exports.create = async (req, res) => {
  try {
    const { OrderDate, OrderNo, UserID } = req.body;

    if (!OrderNo) {
      return res.status(400).json({
        message: "OrderNo is required",
      });
    }

    const existOrderNo = await Order.findOne({
      where: { OrderNo },
    });

    if (existOrderNo) {
      return res.status(400).json({
        message: "Order number already exists",
      });
    }

    if (UserID) {
      const userExist = await User.findByPk(UserID);
      if (!userExist) {
        return res.status(404).json({
          message: "UserID not found",
        });
      }
    }

    const createdOrder = await Order.create({
      OrderDate: OrderDate || new Date(),
      OrderNo,
      UserID: UserID || null,
    });

    return res.status(201).json({
      message: "Order created successfully",
      data: createdOrder,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const findID = await ord.findByPk(id);
    if (!findID) return res.status(404).json({ message: "Order not found" });

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
    const data = await ord.findByPk(id);
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

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const OrderDetail = sequelize.define(
    "OrderDetail",
    {
      Odid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ProductID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Product",
          key: "ProductID",
        },
      },
      OrderID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Order",
          key: "OrderID",
        },
      },
      Qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Discount: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0,
      },
    },
    {
      tableName: "OrderDetail",
      timestamps: false,
      indexes: [{ fields: ["OrderID"] }, { fields: ["ProductID"] }],
    }
  );

  return OrderDetail;
};

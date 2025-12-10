const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Order = sequelize.define(
    "Order",
    {
      OrderID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      OrderDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      OrderNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      UserID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "User",
          key: "UserID",
        },
      },
    },
    {
      tableName: "Order",
      timestamps: false,
      indexes: [{ fields: ["UserID"] }, { fields: ["OrderDate"] }],
    }
  );

  return Order;
};

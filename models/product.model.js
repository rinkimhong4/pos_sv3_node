const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define(
    "Product",
    {
      ProductID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ProductName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      Qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      ProductImage: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      Discount: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0,
      },
      CategoryID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Category",
          key: "CategoryID",
        },
      },
    },
    {
      tableName: "Product",
      timestamps: false,
      indexes: [{ fields: ["CategoryID"] }, { fields: ["ProductName"] }],
    }
  );

  return Product;
};

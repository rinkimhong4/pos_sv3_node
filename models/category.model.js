const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Category = sequelize.define(
    "Category",
    {
      CategoryID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      CategoryName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "Category",
      timestamps: false,
      // indexes: [{ fields: ["CategoryName"] }],
    }
  );

  return Category;
};

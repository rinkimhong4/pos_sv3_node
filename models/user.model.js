const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      UserID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      Password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "User",
      timestamps: false,
      indexes: [{ fields: ["Username"] }],
    }
  );

  return User;
};

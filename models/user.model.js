const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
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
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "active",
      },
    },
    {
      tableName: "User",
      timestamps: false,
      indexes: [{ fields: ["Username"] }],
      // hooks: {
      //   beforeCreate: async (user) => {
      //     if (user.Password) {
      //       const salt = await bcrypt.genSalt(10);
      //       user.Password = await bcrypt.hash(user.Password, salt);
      //     }
      //   },
      //   beforeUpdate: async (user) => {
      //     if (user.changed("Password")) {
      //       const salt = await bcrypt.genSalt(10);
      //       user.Password = await bcrypt.hash(user.Password, salt);
      //     }
      //   },
      // },
    }
  );

  return User;
};

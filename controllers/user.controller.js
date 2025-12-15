const Op = require("sequelize");
const db = require("../services/DBContext");
const user = db.User;
const User = db.User;
const bcrypt = require("bcrypt");
exports.findAll = async (req, res) => {
  try {
    const users = await user.findAll();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const existingUser = await user.findByPk(userId);

    if (!existingUser) {
      throw new Error("User not found");
    }

    res.json(existingUser);
  } catch (error) {
    const errorMessage = error.message || "Some error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
exports.login = async (req, res) => {
  try {
    const { Username, Password } = req.body;

    if (!Username) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!Password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({
      where: { Username },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const correctPassword = await bcrypt.compare(Password, user.Password);

    if (!correctPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.json({
      message: "Login successful",
      user: {
        UserID: user.UserID,
        Username: user.Username,
        status: user.status,
      },
    });
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(500).json({
        message: "Internal server error: null pointer reference",
      });
    } else if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
      });
    } else {
      return res.status(500).json({
        message: "Internal server error: unknown error",
      });
    }
  }
};

exports.create = async (req, res) => {
  try {
    const { Username, Password, status } = req.body;
    console.log(req.body);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(Password, salt);

    await user.create({
      Username: Username,
      Password: hash,
      status: status || "active",
    });

    const listUser = await user.findAll({
      attributes: { exclude: ["Password"] },
    });

    res.json({
      message: "User created successfully",
      listUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to create user",
    });
  }
};

exports.search = async (req, res) => {
  const userName = req.params.name;
  try {
    const username = await user.findOne({
      where: { Username: userName },
      attributes: { exclude: ["Password"] },
    });

    if (!username) {
      return res
        .status(404)
        .json({ message: `Category with name '${userName}' not found` });
    }

    res.json(username);
  } catch (error) {
    res.status(500).json({ message: error.message || "Some error occurred" });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await user.findByPk(id);
    if (!data) return res.status(404).json({ message: "User not found" });
    await data.destroy();
    res.json({
      message: "User deleted successfully",
      data,
    });
  } catch (e) {
    res.status(500).json({ message: e.message || "Some error occurred" });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { Password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (Password) {
      const salt = await bcrypt.genSalt(10);
      req.body.Password = await bcrypt.hash(Password, salt);
    }

    await user.update(req.body);

    res.json({
      message: "User updated successfully",
      data: {
        UserID: user.UserID,
        Username: user.Username,
        status: user.status,
      },
    });
  } catch (e) {
    res.status(500).json({
      message: e.message || "Some error occurred",
    });
  }
};

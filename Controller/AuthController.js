require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User is  already exist", success: false });
    }
    const userModel = new UserModel({ email, name, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    return res
      .status(201)
      .json({ message: "Signup successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Interal server error", success: false });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({
          message: "Auth failed email or password is wrong",
          success: false,
        });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res
        .status(403)
        .json({
          message: "Auth failed email or password is wrong",
          success: false,
        });
    }
    const jwtToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_secret,
      { expiresIn: "24h" }
    );

    return res
      .status(200)
      .json({ message: "Login successfully", success: true, jwtToken, email,name:user.name });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Interal server error", success: false });
  }
};
module.exports = { signup , login};

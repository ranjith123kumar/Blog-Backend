const BlogUserModel = require("../models/bloguser");
const generateOtp = require("../utils/otpGeneration");
const mail = require("../utils/mailService");
const { generateToken } = require("../middleware/auth");

const userRegisterController = async (req, res) => {
  try {
    const user = req.body;
    const storeData = new BlogUserModel(user);
    await storeData.save();
    res
      .status(201)
      .send({ message: "Create User Successfully", data: storeData });
  } catch (error) {
    return res.status(500).send("Error creating user", error);
  }
};

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await BlogUserModel.findOne({ email: email });
    if (!existUser) {
      const error = new Error("You are not registered");
      error.statusCode = 404;
      throw error;
    }
    const comparePassword = await bcrypt.compare(password, existUser.password);
    if (!comparePassword) {
      const error = new Error("Incorrect credentials");
      error.statusCode = 401;
      throw error;
    }
    const token = await generateToken(existUser._id);
    return res
      .status(200)
      .send({ message: "User login successfully", data: { token: token } });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Error when creating user" });
  }
};

const userLoginWithOtpController = async (req, res) => {
  try {
    const { email } = req.body;
    const existUser = await BlogUserModel.findOne({ email: email });
    if (!existUser) {
      const error = new Error("YOU are not registered");
      error.statusCode = 404;
      throw error;
    }
    const otp = await generateOtp();
    existUser.otp = otp;
    existUser.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await existUser.save();
    const sendOtp = await mail(email.otp);
    return res.status(200).send({ message: "OTP send successfully" });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Error when creating user" });
  }
};

const resendOtpController = async (req, res) => {
  try {
    const { email } = req.body;
    const existUser = await BlogUserModel.findOne({ email: email });
    if (!existUser) {
      const error = new Error("YOU are not registered");
      error.statusCode = 404;
      throw error;
    }
    const otp = await generateOtp();
    existUser.otp = otp;
    existUser.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await existUser.save();
    const sendOtp = await mail(email.otp);
    return res.status(200).send({ message: "OTP send successfully" });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Error when creating user" });
  }
};

const userVerifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const existUser = await BlogUserModel.findOne({ email: email });
    if (!existUser) {
      const error = new Error("You are not registered");
      error.statusCode = 404;
      throw error;
    }
    if (existUser.otp !== otp) {
      const error = new Error("Incorrect otp");
      error.statusCode = 400;
      throw error;
    }
    const token = await generateToken(existUser._id);
    return res
      .status(200)
      .send({ message: "OTP verified successfully", data: { token: token } });
  } catch (error) {
    return res.status(500).send("Error when verify otp", error);
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newpassword } = req.body;

  try {
    const user = await BlogUserModel.findOne({ email, otp });

    if (!user) {
      return res.status(400).json({ message: "Invalid User" });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    console.log("Password hashed", hashedPassword);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    console.log("user", user);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error resetting password", error });
  }
};

//profile
const showProfileController = async (req, res) => {
  try {
    const userId = req.user.id;
    const showUser = await BlogUserModel.findById(userId).select({
      password: 0,
    });
    return res
      .status(200)
      .send({ message: "User profile get successfully", data: showUser });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Error when showing user" });
  }
};


module.exports = {
  userRegisterController,
  userLoginController,
  userLoginWithOtpController,
  resendOtpController,
  userVerifyOtpController,
  resetPassword,
  showProfileController,
};

const { sign } = require("crypto");
const express = require("express");
const userRouter = express.Router();
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  // updateMe,
  deleteMe,
  deleteAllUsers,
} = require("../controllers/userController");

const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
  logout,
  subscribe,
} = require("../controllers/authController");

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/forgetPassword").post(forgetPassword);
userRouter.route("/resetPassword/:token").patch(resetPassword);
userRouter.route("/subscribe").post(subscribe);

//Protect
userRouter.use(protect);

userRouter.route("/me").get(getUser);
userRouter.route("/updatePassword").patch(updatePassword);
userRouter.route("/deleteMe").delete(deleteMe);
userRouter.route("/deleteAll").delete(restrictTo("admin"), deleteAllUsers);

//Restrict
module.exports = userRouter;

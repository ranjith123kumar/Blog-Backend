const express = require("express");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const router = express.Router();

router.post("/register", userController.userRegisterController);
router.post("/login", userController.userLoginController);

router.post("/send-otp", userController.userLoginWithOtpController);
router.post("/resend-otp", userController.resendOtpController);

router.post("/reset-password", userController.resetPassword);

router.post("/verify-otp", userController.userVerifyOtpController);

router.get("/profile", userController.showProfileController);

//get
router.get("/user", postController.userGetController); //admin only
router.get("/user/:id", postController.userGetController);

//update
router.put("/user", postController.userUpdateController);
router.put("/user/:id", postController.userUpdateController);

//delete
router.delete("/user", postController.userDeleteController);
router.delete("/user/:id", postController.userDeleteController);

module.exports = router;

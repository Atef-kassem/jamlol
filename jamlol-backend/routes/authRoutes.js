const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const protect = require("../middlewares/protectionMiddleware");
const restrictionMiddleware = require("../middlewares/restrictionMiddleware");
const { signup, login, forgotPassword, resetPassword, updatePassword } = require("../controllers/authController");
const { getUser, updateMyData, deActivateUser, getMe } = require("../controllers/userController");
const loginValidator = require("../middlewares/loginValidator");
const {
  signUpDataValidation,
  checkUserNotExists,
  checkUserExists,
} = require("../validators/UserValidations/insertedData");

const limiter = rateLimit({
  max: 3,
  windowMs: 5 * 60 * 1000,
  message: "Too many tries of login requests , please try again in an 15 minutes!",
});

router.post("/signup", signUpDataValidation, checkUserNotExists, signup);
router.post("/login", limiter, loginValidator, login); 
router.post("/forgotpassword",protect, forgotPassword);
router.patch("/restpassword/:token", resetPassword);

// TODO protect all routes come after this

router.get(
  "/me",
  protect,
  getMe
);

router.patch("/updatepassword", protect, updatePassword);
router.patch("/updatemydata", protect, updateMyData);
router.delete("/deActivateUser", protect, deActivateUser);

// TODO retrict all normal users  only admin can access
// router.use(restrictionMiddleware("admin"));

module.exports = router;

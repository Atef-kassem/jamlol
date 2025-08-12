const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../Model/userModel");

const JWT_SECRET = process.env.JWT_SECRET ;

module.exports = async (req, res, next) => {
  let token;
  //  1) Check if token is provided in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]; // Extract the token from the header
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    return next(new AppError("You are not logged in ! Please log in to get access.", 401));
  }

  // 2) Verify token
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, JWT_SECRET);
  } catch (err) {
    return next(new AppError("Invalid token! Please log in again.", 401));
  }

  if (!decoded) {
    return next(new AppError("Invalid token! Please log in again.", 401));
  }
  console.log("decoded",decoded.id)
  // 3) Check if user still exists (Sequelize)
  const isExistingUser = await User.findByPk(decoded.id);
  if (!isExistingUser) {
    return next(new AppError("The user belonging to this token no longer exists.", 401));
  }

  // 4) Optionally: Check if user changed password after the token was issued (implement if needed)
  // if (isExistingUser.checkPasswordChangedAfter && isExistingUser.checkPasswordChangedAfter(decoded.iat)) {
  //   return next(new AppError("User recently changed password! Please log in again.", 401));
  // }

  // 5) Grant access to the protected route by attaching user to the request object
  req.user = isExistingUser;

  next();
};

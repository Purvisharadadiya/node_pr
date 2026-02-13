const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  try {

    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        message: "Token missing"
      });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token format"
      });
    }

    const user = jwt.verify(token, "user"); // lowercase

    if (user.role !== "user") {
      return res.status(403).json({
        message: "User access only"
      });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = verifyUser;

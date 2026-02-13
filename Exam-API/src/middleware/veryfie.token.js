const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
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

    const admin = jwt.verify(token, "admin");

    if (admin.role !== "Admin") {
      return res.status(403).json({
        message: "Admin access only"
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = verifyAdmin;


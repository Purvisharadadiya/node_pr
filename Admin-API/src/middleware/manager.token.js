const jwt = require("jsonwebtoken");

const verifyManager = (req, res, next) => {
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

    const manager = jwt.verify(token,"admin-Manager");

    if (manager.role !== "Manager") {
      return res.status(403).json({
        message: "Manager access only"
      });
    }

    req.manager = manager;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = verifyManager;

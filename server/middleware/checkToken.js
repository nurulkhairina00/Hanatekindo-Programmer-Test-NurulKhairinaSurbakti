const jwt = require("jsonwebtoken");
const config = require("../database/config");

const checkToken = (req, res, next) => {
  var token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Problem dengan token",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "Token tidak tersedia",
    });
  }
};

module.exports = checkToken;

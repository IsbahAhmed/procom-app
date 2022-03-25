const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearertoken = bearer[1];
    req.token = bearertoken;
    jwt.verify(req.token, "test123", async (err, Authdata) => {
      if (err) {
        return res.json({
          message: "Token Verification Failed",
          auth: "authFailed",
          statusCode: 403,
        });
      } else {
        req.user = Authdata;

        next();
      }
    });
  } else {
    return res.json({
      message: "No Token Found",
      auth: "authFailed",
      statusCode: 403,
    });
  }
};
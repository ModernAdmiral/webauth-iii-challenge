const jwt = require("jsonwebtoken");
const secret = require("../config/secrets");
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "forbidden!" });
      } else {
        req.decodedJwt = decodedToken;
        console.log("decoded token", req.decodedJwt);

        next();
      }
    });
  } else {
    res.status(401).json({ message: "you shall not pass!" });
  }
};

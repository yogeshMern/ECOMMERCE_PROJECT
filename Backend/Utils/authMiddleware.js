const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let authHeader = req.signedCookies;
    if (authHeader) {
      let token = authHeader.authToken;
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
        if (err) {
          return res
            .status(401)
            .json({ message: "Please Login to access this resource!" });
        }
        // console.log(1111111111111111111111111, data);
        req.user = data;
        next();
      });
    } else {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this resource." });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

/*


module.exports = (req, res, next) => {
  try {
    let authHeader = req.signedCookies;
    if (authHeader) {
      let token = authHeader.authToken;
      let user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized User!" });
    }

    next();
  } catch (error) {
    res.status(500).json({
      details: error,
    });
  }
};

*/

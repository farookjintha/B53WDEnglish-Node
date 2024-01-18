const jwt = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
  try {
    const { cookies } = req;

    if (cookies.accessToken) {
      const obj = await jwt.verify(cookies.accessToken, process.env.SECRET_KEY); // Decryption from token to jsonObj

      // req._id = obj._id;

      if (!obj._id) {
        return res.status(401).send({
          message: "Not Authenticated",
        });
      }

      return next();
    }

    return res.status(401).send({
      message: "Not Authenticated.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

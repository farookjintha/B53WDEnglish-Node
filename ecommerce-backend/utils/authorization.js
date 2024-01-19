const Users = require("../models/users.model");

exports.isAdmin = async (req, res, next) => {
  try {
    const { _id } = req;

    const currentUser = await Users.findOne({ _id: _id });

    if (currentUser) {
      if (currentUser.role !== 1) {
        return res.status(401).send({
          message: "Not Authorized: Admin Resource",
        });
      }

      return next();
    }

    return res.status(401).send({
      message: "Not Authorized: Admin Resource",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

exports.isPrivilegedUser = async (req, res, next) => {
  try {
    const { _id } = req;

    const currentUser = await Users.findOne({ _id: _id });

    if (currentUser) {
      if (currentUser.role !== 2) {
        return res.status(401).send({
          message: "Not Authorized: Privileged User Resource",
        });
      }

      return next();
    }

    return res.status(401).send({
      message: "Not Authorized: Privileged User Resource",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

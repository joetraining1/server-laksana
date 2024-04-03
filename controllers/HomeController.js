const { User } = require("../models/UserModel");
const bcrypt = require("bcrypt");

exports.HomeController = {
  async getUserByEmail(email) {
    const iUser = await User.findOne({
      where: {
        email: email,
      },
    });
    return iUser ? iUser : null;
  },

  async register(req, res) {
    // check for available user
    const iUser = await this.getUserByEmail(req.body.email);

    // responding to case user available
    if (iUser) {
      return res.status(400).send({
        status: "FAIL",
        message: "Email already registered.",
      });
    }

    // encrypting password
    const hashPassword = bcrypt.hashSync(req.body.password, 10);

    // storing data to database
    const user = await User.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    });

    //responding request
    return res.status(200).send({
      status: "success",
      result: {
        userId: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        image: user.image,
        url: user.url,
      },
    });
  },

  async login(req, res) {
    const iUser = await this.getUserByEmail(req.body.email);

    if (!iUser) {
      return res.status(400).send({
        status: "fail",
        message: "User is not registered on this application.",
      });
    }

    if (bcrypt.compareSync(req.body.password, iUser.password)) {
      return res.status(200).send({
        status: "success",
        result: {
          userId: user.id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          image: user.image,
          url: user.url,
        },
      });
    }

    return res.status(400).send({
      status: "fail",
      message: "Wrong Password.",
    });
  },
};

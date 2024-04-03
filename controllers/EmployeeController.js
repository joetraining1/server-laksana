const bcrypt = require("bcrypt");

const { Employee } = require("../models/EmployeeModel");
const { NoPermits } = require("../lib/Message");

exports.EmployeeController = {
  //checking user by email
  async getEmployeeByEmail(email) {
    //using email as parameter to check on mysql database using sequelize
    const iUser = await Employee.findOne({
      where: {
        email: email,
      },
    });
    return iUser ? iUser : null;
  },

  async register(req, res) {
    console.log(req.body);
    // check for available email
    const iUser = await Employee.findOne({
      where: {
        email: req.body.email,
      },
    });

    // responding to case email available
    if (iUser) {
      return res.status(400).send({
        status: "FAIL",
        message: "Email already registered.",
      });
    }

    // encrypting password
    const hashPassword = bcrypt.hashSync(req.body.password, 10);

    // storing data to database
    const user = await Employee.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      jabatan: "Staff",
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

  //login request
  async login(req, res) {
    //extracting user by email
    const iUser = await Employee.findOne({
      where: {
        email: req.body.email,
      },
    });
    //response to unregistered email
    if (!iUser) {
      return res.status(400).send({
        status: "fail",
        message: "User is not registered on this application.",
      });
    }

    //comparing password, if match then sending user data
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

    //responding to false password comparison
    return res.status(400).send({
      status: "fail",
      message: "Wrong Password.",
    });
  },

  async store(req, res) {
    const employ = await EmployeeController.getEmployeeByEmail(
      res.body.user_email
    );

    if (employ) {
      const relative = await Relative.create({
        nama: req.body.nama,
        alamat: req.body.alamat,
        phone: req.body.phone,
        user_id: employ.id,
      });
      return res.status(200).send({
        status: "success",
        message: "relative added",
      });
    }

    return res.status(404).send({
      status: "fail",
      message: "employee not found.",
    });
  },

  async edit(req, res) {
    const employee = await EmployeeController.getEmployeeByEmail(
      req.params.email
    );

    if (
      req.params.email === employee.email ||
      employee.jabatan === "Supervisor" ||
      employee.jabatan === "Manager"
    ) {
      const relative = await Relative.update({
        nama: req.body.nama ? req.body.nama : iRelative.nama,
        alamat: req.body.alamat ? req.body.alamat : iRelative.alamat,
        phone: req.body.phone ? req.body.phone : iRelative.phone,
      });
      return res.status(200).send({
        status: "success",
        message: "Relative data updated.",
      });
    }

    return res.status(400).send(NoPermits);
  },

  async delete(req, res) {
    const employee = await EmployeeController.getEmployeeByEmail(
      req.body.email
    );

    const iRelative = await Relative.findByPk(req.params.id);

    if (iRelative.user_id === employee.id || employee.jabatan !== "Staff") {
      const relative = await Relative.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send({
        status: "success",
        message: "Relative data deleted.",
      });
    }

    return res.status(404).send(NoPermits);
  },

  async index(req, res) {
    const employ = await this.getEmployeeByEmail(req.params.email);

    if (employ.jabatan !== "Staff") {
      const relative = await Employee.findAll();

      return res.status(200).send({
        status: "success",
        result: relative,
      });
    }

    return res.status(400).send(NoPermits);
  },
};

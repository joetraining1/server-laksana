const { Sequelize } = require("sequelize");
const { Attendance } = require("../models/AttendanceModel.js");
const { EmployeeController } = require("./EmployeeController.js");
const { db } = require("../configs/db.js");

exports.AttendanceController = {
  async store(req, res) {
    //value translate to
    const statuses = {
      1: "ON TIME",
      2: "LATE",
      3: "BREAK",
      4: "RETURN",
      5: "OVER",
    };

    //check employee by email
    const employ = await EmployeeController.getEmployeeByEmail(
      res.body.user_email
    );

    //processing request
    if (employ) {
      //extracting hours
      const DT = new Date();

      //determining status value
      const status = req.body.status
        ? req.body.status
        : DT.getHours() >= 7 && DT.getHours <= 9
        ? 1
        : 2;

      // storing data
      const attend = await Attendance.create({
        status: status,
        user_id: employ.id,
      });

      //response
      return res.status(200).send({
        status: "success",
        message: "attendance added",
      });
    }

    //fail response
    return res.status(404).send({
      status: "fail",
      message: "employee not found.",
    });
  },

  async edit(req, res) {
    const employee = await EmployeeController.getEmployeeByEmail(
      req.body.email
    );

    const iAttend = await Attendance.findByPk(req.params.id);

    if (employee.jabatan !== "Staff" && iAttend) {
      const attend = await Attendance.update({
        status: req.body.status ? req.body.status : iAttend.status,
      });

      return res.status(200).send({
        status: "success",
        message: "Attendance data updated.",
      });
    }

    return res.status(404).send({
      status: "fail",
      message: "you need permission to modify this data.",
    });
  },

  async delete(req, res) {
    const employee = await EmployeeController.getEmployeeByEmail(
      req.body.email
    );

    const iAttend = await Attendance.findByPk(req.params.id);

    if (employee.jabatan !== "Staff" && iAttend) {
      const attend = await Attendance.update({
        status: req.body.status ? req.body.status : iAttend.status,
      });

      return res.status(200).send({
        status: "success",
        message: "Attendance data deleted.",
      });
    }

    return res.status(404).send({
      status: "fail",
      message: "you need permission to modify this data.",
    });
  },

  async index(req, res) {
    const selection =
      "SELECT attendances.id, attendances.status, attendances.user_id, attendances.createdAt, employee.name, employee.phone, employee.alamat, employee.email, employee.jabatan, employee.posisi, employee.domisili ";
    const relation =
      "from attendances RIGHT JOJN employees on attendances.user_id = employess.id";

    const relatives = await db.query(`${selection}${relation}`, {
      type: Sequelize.QueryTypes.SELECT,
    });

    return res.status(200).send({
      status: "success",
      result: relatives,
    });
  },

  async indexByEmployee(req, res) {
    const employee = await EmployeeController.getEmployeeByEmail(
      req.params.email
    );

    if (!employee) {
      return res.status(404).send({
        status: "fail",
        message: "employee not found.",
      });
    }

    const relative = await Attendance.findAll({
      where: {
        user_id: employee.id,
      },
    });

    return res.status(200).send({
      status: "success",
      result: relative,
    });
  },
};

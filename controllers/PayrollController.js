const { Sequelize } = require("sequelize");
const { Payroll } = require("../models/PayrollModel.js");
const { EmployeeController } = require("./EmployeeController.js");
const { db } = require("../configs/db.js");
const { NoPermits } = require("../lib/Message.js");


exports.PayrollController = {
  async store(req, res) {
    const employ = await EmployeeController.getEmployeeByEmail(
      res.body.user_email
    );

    const employee = await EmployeeController.getEmployeeByEmail(
      req.body.employee
    );

    if (employ && employee) {
      const pay = await Payroll.create({
        nominal: req.body.nominal,
        ref_no: req.body.ref_no,
        start: req.body.start,
        end: req.body.end,
        user_id: employee.id,
      });
      return res.status(200).send({
        status: "success",
        message: "Payroll added.",
      });
    }

    return res.status(404).send({
      status: "fail",
      message: "employee not found.",
    });
  },

  async edit(req, res) {
    const employ = await EmployeeController.getEmployeeByEmail(req.body.email);

    const employee = await EmployeeController.getEmployeeByEmail(
      req.body.employee
    );

    const iPay = await Payroll.findByPk(req.params.id);

    if (employ.jabatan !== "Staff" && iPay && employee) {
      const pay = await Payroll.update({
        nominal: req.body.nominal ? req.body.nominal : iPay.nominal,
        ref_no: req.body.ref_no ? req.body.ref_no : iPay.ref_no,
        start: req.body.start ? req.body.start : iPay.start,
        end: req.body.end ? req.body.end : iPay.end,
        user_id: req.body.employee ? employee.id : iPay.user_id,
      });
      return res.status(200).send({
        status: "success",
        message: "Payroll data updated.",
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

    const iPay = await Payroll.findByPk(req.params.id);

    if (employee.jabatan !== "Staff" && iPay) {
      const relative = await Payroll.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send({
        status: "success",
        message: "Payroll data deleted.",
      });
    }

    return res.status(404).send({
      status: "fail",
      message: "you need permission to modify this data.",
    });
  },

  async index(req, res) {
    const employ = await this.getEmployeeByEmail(req.params.email);

    if (employ.jabatan !== "Staff") {
      const selection =
        "SELECT payrolls.id, payrolls.nominal, payrolls.ref_no, payrolls.start, payrolls.end, payrolls.user_id, employee.name, employee.phone, employee.email, employee.alamat, employee.jabatan, employee.posisi, employee.domisili ";
      const relation =
        "from payrolls RIGHT JOJN employees on payrolls.user_id = employess.id";

      const relatives = await db.query(`${selection}${relation}`, {
        type: Sequelize.QueryTypes.SELECT,
      });

      return res.status(200).send({
        status: "success",
        result: relatives,
      });
    }

    return res.status(400).send(NoPermits)
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

    const relative = await Payroll.findAll({
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

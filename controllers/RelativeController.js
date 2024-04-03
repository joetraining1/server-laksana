const { Sequelize } = require("sequelize");
const { Relative } = require("../models/RelativeModel");
const { EmployeeController } = require("./EmployeeController.js");
const { db } = require("../configs/db.js");
const { NoPermits } = require("../lib/Message.js");

exports.RelativeController = {
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
      req.body.email
    );

    const iRelative = await Relative.findByPk(req.params.id);

    if (iRelative.user_id === employee.id || employee.jabatan !== "Staff") {
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

    return res.status(404).send({
      status: "fail",
      message: "you need permission to modify this data.",
    });
  },

  async delete(req, res) {
    const employee = await EmployeeController.getEmployeeByEmail(
      req.body.email
    );

    const iRelative = await Relative.findByPk(req.params.id);

    if (iRelative.user_id === employee.id || employee.jabatan !== "Staff") {
      const relative = await Relative.destroy({
        where: {
            id: req.params.id
        }
      });
      return res.status(200).send({
        status: "success",
        message: "Relative data deleted.",
      });
    }

    return res.status(404).send({
      status: "fail",
      message: "you need permission to modify this data.",
    });
  },

  async index(req, res) {

    const employee = await EmployeeController.getEmployeeByEmail(
        req.params.email
      );

    if(!employee){
        return res.status(400).send(NoPermits)
    }
    const selection =
      "SELECT relatives.id, relatives.nama, relatives.phone as 'HP', relatives.alamat as 'address', relatives.user_id, employee.name, employee.phone, employee.alamat, employee.email, employee.id, employee.jabatan, employee.posisi, employee.domisili ";
    const relation =
      "from relatives RIGHT JOJN employees on relatives.user_id = employess.id";

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

    const relative = await Relative.findAll({
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

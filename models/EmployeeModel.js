const { DataTypes } = require("sequelize");

const { db } = require("../configs/db");

const { Relative } = require("./RelativeModel");
const { Attendance } = require("./AttendanceModel");
const { Payroll } = require("./PayrollModel");
const { User } = require("./UserModel");

const Employee = db.define("employees", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  alamat: DataTypes.STRING,
  domisili: DataTypes.STRING,
  posisi: DataTypes.STRING,
  jabatan: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
});

Employee.hasMany(Relative, {
  foreignKey: {
    name: "user_id",
    allowNull: true,
  },
});
Employee.hasMany(Attendance, {
  foreignKey: {
    name: "user_id",
    allowNull: true,
  },
});
Employee.hasMany(Payroll, {
  foreignKey: {
    name: "user_id",
    allowNull: true,
  },
});

Relative.belongsTo(User, {
  foreignKey: {
    name: "user_id",
    allowNull: true,
  },
});
Attendance.belongsTo(User, {
  foreignKey: {
    name: "user_id",
    allowNull: true,
  },
});
Payroll.belongsTo(User, {
  foreignKey: {
    name: "user_id",
    allowNull: true,
  },
});

exports.Employee = Employee;

const { DataTypes } = require('sequelize')

const { db } = require('../configs/db')

const Payroll = db.define("payrolls", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nominal: DataTypes.STRING,
    ref_no: DataTypes.STRING,
    start: DataTypes.STRING,
    end: DataTypes.STRING,
})

exports.Payroll = Payroll
const { DataTypes } = require('sequelize')

const { db } = require('../configs/db')

const Attendance = db.define('attendances', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: DataTypes.INTEGER
    }
})

exports.Attendance = Attendance
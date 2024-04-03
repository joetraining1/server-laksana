const { DataTypes } = require('sequelize')

const { db } = require('../configs/db')

const Relative = db.define('relatives', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    phone: DataTypes.STRING,
})

exports.Relative = Relative
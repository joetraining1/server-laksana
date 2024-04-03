// dependencies
const { DataTypes } = require('sequelize')

//database config
const { db } = require('../configs/db')

//relational table

//model define
const User = db.define('users', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

// relation constraints

exports.User = User
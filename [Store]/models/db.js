const { Model } = require("sequelize")
const Sequelize = require("sequelize")
const sequelize = new Sequelize('skstore','root','', {   
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize
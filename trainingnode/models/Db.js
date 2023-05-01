const Sequelize = require('Sequelize')
const sequelize = new Sequelize("handle","root","",{
    host: "localhost",
    dialect: "mysql"
})

module.exports = {
    Sequelize: Sequelize, 
    sequelize: sequelize
}
const Sequelize = require("sequelize")
const sequelize = new Sequelize('brasil_realismo_roleplay','root','', {   
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize
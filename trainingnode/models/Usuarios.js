const db = require('./Db')

const Usuario = db.sequelize.define('usuario',{
    nome: {
        type: db.Sequelize.TEXT
    },senha: {
        type: db.Sequelize.TEXT
    },email: {
        type: db.Sequelize.STRING 
    },recuperacao: {
        type: db.Sequelize.INTEGER
    }
})

//Usuario.sync({force: true})

module.exports = Usuario
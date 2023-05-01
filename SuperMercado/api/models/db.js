const Sequelize = require('sequelize');

const sequelize = new Sequelize('itekilasystem','root','', {   
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(function(){
    console.log('Operação realizada.')
}).catch(function(){
    console.log('Operação interna falhou! Contacte via Whatsapp +55 67993462261')
})

module.exports = sequelize;
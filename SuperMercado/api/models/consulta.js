const Sequelize = require('sequelize');
const sequelize = require('./db');

const db = require('./db')



const User = db.define('usuarios',  {   
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    authlevel: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    email:  {   
        type: Sequelize.STRING,
        allowNull: true
    },
    passwd: {   
        type: Sequelize.STRING,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
});



module.exports = User;
const Sequelize = require('sequelize');
const sequelize = require('./db');

const db = require('./db')

const Product = db.define('produtoscad',{
    nome: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    ean:    {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    estoque:    {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    valor:  {
        type: Sequelize.TEXT,
        allowNull: false,
    }
    },
    {
        timestamps: false
    }
    )


module.exports = selecionarEan;
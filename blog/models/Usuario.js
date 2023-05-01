const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema({
    nome:{
        type: String
    },email:{
        type: String
    },senha:{
        type: String
    },
    eadmin:{
        type: Number, 
        default: 0
    }
})


mongoose.model("usuarios", Usuario)
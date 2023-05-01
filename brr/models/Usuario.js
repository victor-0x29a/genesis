const mongoose = require('mongoose')

const Schema = mongoose.Schema


const usuario = new Schema({
    nome:{
        type: String, 
        required: true
    },
    email:{
        type: String,
        required: true
    },senha: {
        type: String,
        required: true
    },
    isconfirm:{
        type: Number,
        default: 0
    }
    ,usuario:{
        type: String, 
        default: "0"
    },
    brr_account_bank:{
        type: Number,
        default: 0
    },
    brr_is_online_in_sv:{
        type: Number,
        default: 0
    },
    isstaff:{
        type: Number,
        default: 0
    },stafflevel:{
        type: Number,
        default: 0
    }
})

mongoose.model("usuarios",usuario)
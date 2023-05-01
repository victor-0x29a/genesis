const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Servidor = new Schema({
    status:{
        type: String,
        required: true
    },
    identificacao:{
        type: String,
        required: true
    }
})


mongoose.model("servidor", Servidor)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const atualizacoes = new Schema({
    titulo: {
        type: String,
        required: true
    },texto: {
        type: String, 
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    data:{
        type: Date,
        default: Date.now()
    }

})

mongoose.model("atualizacoes", atualizacoes)
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const logs = new Schema({
    mensagem: {
        type: String, 
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})


mongoose.model("logs", logs)
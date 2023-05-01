const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Postagem = new Schema({
    titulo: {
        type: String
    },corpo: {
        type: String
    },slug: {
        type: String
    },categoria: {
        type: Schema.Types.ObjectId,
        ref: "categorias"
    },
    descricao: {
        type: String
    }
    , data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("postagens", Postagem)


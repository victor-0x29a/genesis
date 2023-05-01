const express = require("express")
const cors = require('cors')
const app = express()
const db = require("./models/db")

// -- Configuracoes
app.use(express.json())
app.use(cors())



// -- Funcoes

db.authenticate().then(function(){
    console.log("DB CONNECTED!")
}).catch(function(){
    console.log("Error")
})


async function firstManager(a){
    const userFetch = await db.query(`SELECT * FROM administradores WHERE nome = '${a}';`)
    return userFetch[0]
}

async function upperScale(type, nomecompleto){
    if(type == "on"){
        const query = await db.query(`UPDATE administradores SET islogged = 'true' WHERE ncompleto = '${nomecompleto}'`)
    }else{
        const query = await db.query(`UPDATE administradores SET islogged = 'false' WHERE ncompleto = '${nomecompleto}'`)
    }
}

async function islogged(check){
    const fetch = await db.query(`SELECT * FROM administradores WHERE identificador = '${check}'`)
    return fetch[0]
}

async function verifyUpdate(check){
    const fetchTwo = await db.query(`SELECT * FROM vendas WHERE identificador = '${check}'`)
    return fetchTwo[0]
}

async function verifyVendas(check){
    const fetchThree = await db.query("SELECT * FROM itens")
    return fetchThree[0]
}



// -- Rotas
app.post("/manager", async function(req, res){
    const [usuario, senha] = [req.body.user, req.body.pass]
    const manager = await firstManager(usuario)
    if(manager[0] == null){
        res.json({
            error: 01 // Nenhum usuario
        })
    }else{
        if(manager[0]["passe"] == senha){
            upperScale('on', manager[0]["ncompleto"])
            res.json({
                error: 0, // nenhum erro
                nome: manager[0]["ncompleto"],
                telefone: manager[0]["ntelefone"],
                checkpoint: manager[0]["identificador"]
            })
        }else{
            res.json({
                error: 02 // Senha incorreta
            })
        }
    }
})


app.post("/islogged", async function (req, res){
    let resolve = await islogged(req.body.check)
    if(resolve[0]["islogged"] == 'true'){
        res.json({
            error: 0,// logado
            nome: resolve[0]["ncompleto"]
        })
    }else{
        res.json({
            error: 1 // n logado
        })
    }
})

app.post("/attvenda", async function(req, res){
    let resolveTwo = await verifyUpdate(req.body.check)
    res.json({
        result: resolveTwo
    })

})

app.post("/attitens", async function(req, res){
    let resolveThree = await verifyVendas()
    res.json({
        result: resolveThree
    })
})


// -- Comeca a ouvir na porta 2022
app.listen(2022, function(){
    console.log("localhost:2022")
})
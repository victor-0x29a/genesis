const express = require('express');
const { type } = require('express/lib/response');
const res = require('express/lib/response');
const db = require('./models/db')
const app = express();
const cors = require('cors');
const User = require('./models/consulta');
const { RANDOM } = require('mysql/lib/PoolSelector');
const req = require('express/lib/request');
const {Base64} = require('js-base64');

app.use(express.json())
app.use(cors())






async function selecionarEan(a){
    const linhas = await db.query(`SELECT * FROM produtoscad WHERE ean = '${a}'`)
    return linhas[0]
}


async function puxarCargo(a){
    const queryfetch = await db.query(`SELECT * FROM funcionarios WHERE cargo = '${a}';`)
    return queryfetch[0]
}


async function puxarNota(a){
    const query = await db.query(`SELECT * FROM notasconfirmadas WHERE nfe = '${a}';`)
    return query[0]
}
async function criarNota(caixa,nfe,lista,valor,cpf){
    const query = await db.query(`INSERT INTO notasconfirmadas(operantecaixa,nfe,cpf,valortotal,produtos) VALUES('${caixa}', '${nfe}', '${cpf}', '${valor}', '${lista}');`)
}
async function sendNota(cpf, numeronota, total, produtos, caixa){
    const query = await db.query(`INSERT INTO notasconfirmadas(operantecaixa, numeronota, cpf, valortotal, produtos)
    VALUES("${caixa},${numeronota},${cpf},${total},${produtos}")`)
}

async function confirmationCpf(cpf){
    const query = await db.query(`SELECT * FROM clientes WHERE cpf = '${cpf}'`)
    return query[0]
}
app.post('/confirm', async(req,res)=>{
    const {cpf} = req.body
    let a = await confirmationCpf(cpf)
    if(a.length < 1){
        return res.json({
            x: false
        })
    }else{
        return res.json({
            x: true
        })
    }
})
app.post('/user', async (req, res)=>{
    try{
        await User.create(req.body).then(()=>{
            return res.json({
                erro: false,
                mensagem: "Cadastrado"
            })
        }).catch((e)=>{
            console.log(req.body)
            return res.json({
                erro: true,
                mensagem: e
            })
        })
    }catch(e){
        console.log(e)
    }
})
app.post('/caixa', async (req,res)=>{
    const dados = await selecionarEan(req.body['codigoDeBarras'])
    return res.json({
        dados
    })
})
app.post('/generatenota',   async(req,res)=>    {   
    const {cpf, valortotal, produtos, operantecaixa} = req.body; 
    let numeroDanota = Math.random().toString(25)
    let dadosDb = await puxarNota(numeroDanota)
    let produtosFront = Base64.encode(produtos)
    if(dadosDb.length < 1){
        let requisicao = await criarNota(operantecaixa,numeroDanota,produtosFront,valortotal,cpf)
        return res.json({
            y: 1
        })
    }else{
        return res.json({
            y: 0
        })
    }
})
app.post('/grudfunc', async(req,res)=>  {   
    const {cargo} = req.body 
    let dado = await puxarCargo(cargo);
    console.log(dado.length)
    if(dado.length == 0){
        return res.json({
            erro: 1
        })
    }else{
        return res.json({
            erro: 0,
            dado
        })
    }
})
app.post('/userrecon', async (req,res)=>{
    var consumation = Math.random().toString(15)
    const {name, passwd} = req.body;
    const UserPesquisa = await User.findAll({
        where:  {   
            nome: name
        }
    })
    if(UserPesquisa == null || UserPesquisa == 0){
        return res.json({
            erro: true,
            dados: 'Not found!'
        })
    }else{
        if(UserPesquisa[0].passwd == passwd){
            return res.json({
                confirm: 1,
                unknown: consumation
            })
        }else{
            return res.json({
                confirm: 'ops'
            })
        }

    }
})




app.listen(2022, ()=>{
    console.log('localhost:2022 by Victor');
});
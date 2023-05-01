const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const handlebars = require('express-handlebars')
const Usuario = require("./models/Usuarios")
//Config
    //Template engine 
    app.engine('handlebars',handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
        // BodyParser
            app.use(bodyParser.urlencoded({extended: true}))
            app.use(bodyParser.json())    


app.get("/", (req, res)=>{
    Usuario.findAll().then((u)=>{
        res.render('home', {u: u})
    })
})

app.get("/deletar/:id",(req, res)=>{
    Usuario.destroy({where: {'id': req.params.id}}).then(()=>{
        res.send("Postagem deletada")
    }).catch((e)=>{
        res.send("Postagem inexistente")
    })
})

app.get("/cad", (req, res)=>{
    res.render('formulario')
})
app.post("/cad", (req, res)=>{
    Usuario.create({
        nome: req.body.usuario,
        senha: req.body.senha,
        email: req.body.email,
        recuperacao: req.body.recuperacao
    })
    res.redirect("/")
})






app.listen(9999,()=>{
    console.log("localhost:9999 - C h e c k")
})

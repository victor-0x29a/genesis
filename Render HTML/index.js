const express = require('express');
const Sequelize = require('Sequelize')
const db = require('./models/db');
const app = express();
let porta = process.env.PORT || 4778

db.authenticate().then(()=>{
    console.log("Conectado")
}).catch(()=>{console.log("Desconectado.")})


async function indexSite(){
    const dado = await db.query("SELECT * FROM `registrados`")
    return dado[0]
}

async function indexVip(){
    const dado = await db.query("SELECT * FROM vips")
    return dado[0]
}

const bodyParser = require('body-parser')
const path = require('path')
const flash = require('req-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.use(session({secret:'123', resave:true, saveUninitialized: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(flash())
app.set("view engine", "ejs")
app.set('views', 'src/views')
app.use(express.static(path.join("src","public")))

/*
Config globais
*/

const ip_mta = "mtasa://15.204.145.119:22013"

/*
*/




app.get('/vip', function(req,res){
    res.render("indexvip.ejs",{})
})

app.get("/", async function(req,res){
    let usuarios = await indexSite()
    res.render("index.ejs",{info: usuarios.length, ip: ip_mta})
})


app.post("/vip/list", async function(req, res){
    let listaVips = await indexVip()
    return res.json({
        vips: listaVips
    })
})















app.listen(porta)

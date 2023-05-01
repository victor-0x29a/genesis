const bodyParser = require('body-parser')
const express = require('express')
const Sequelize = require('Sequelize')
const path = require('path')
const db = require("./src/models/db")
const md5 = require('md5')
const app = express()


db.authenticate().then(()=>{
    console.log("Database conectada.")
}).catch(()=>{
    console.log("Erro na database")
})

const passColect = async (email, pass)=>{
    
    const emailExist = await db.query(`SELECT * FROM registrados WHERE email = '${email}';#`)
    if(emailExist[0] != null){
        console.log("existe")
    }else{
        console.log("Nao existe")
    }
}


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.set("views", "src/views")
app.use(express.static(path.join("src", "public")))

app.get("/", (req,res)=>{
    res.render("index.ejs", {})
})

app.post("/", async (req,res)=>{
    const [senha, email] = [req.body["senha"], req.body["email"]]
    const result = passColect(email)
    res.render("index.ejs")
})

app.listen(8080,()=>{
    console.log("sv rodando")
})
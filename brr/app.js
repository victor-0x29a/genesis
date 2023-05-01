const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const session = require('express-session')
const flash = require('connect-flash')
const handlebars = require('express-handlebars')
const PORT = 9999
const ajuda = require('./routes/ajuda')
const admin = require('./routes/admin')
const path = require('path')
const bcrypt = require('bcryptjs')
const { Passport } = require('passport')
require('./models/Usuario')
const passport = require('passport')
require("./config/auth")(passport)
const {routeLoginAndRegister} = require('./helpers/proteclogin')
const { setInterval } = require('timers/promises')
require('./models/Atualizacoes')
const Atualizacao = mongoose.model("atualizacoes")
const Usuario = mongoose.model("usuarios")
const Client = require("mtasa").Client
const ipServerMta = "localhost"
const servidorMta = new Client(ipServerMta, 22065, "admbrr", "admbrr")

    //Config
        //Limite de requisicao

        //Sessao
        
        app.use(session({
            secret: "ll09_XXXXXX00LlL1l1ll11llll1l1l1l1l99...sss9k9",
            resave: true,
            saveUninitialized: true
        }))
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash())

        //Middleware
        app.use((req,res,next)=>{
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null
            next()
            })

        //BodyParser

        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

        //Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')

        //Mongoose
        mongoose.Promise = global.Promise
        mongoose.connect("mongodb://127.0.0.1/brr",{useNewUrlParser: true}).then(()=>{
            console.log("Conectado.")
        }).catch((e)=>{
            console.log("Mongoose erro: "+e)
        })

        //Public
        app.use(express.static(path.join(__dirname,"/public")))
        app.use((req,res,next)=>{
            next()
        })

    //Rotas
    app.use("/ajuda",ajuda)
    app.use("/admin", admin )
    app.get("/",(req,res)=>{

        Atualizacao.find().then((atualizacoes)=>{
            if(atualizacoes){
                const atts = atualizacoes.map(atualizacoes=>atualizacoes.toJSON())
                if(req.user){
                    res.render("index",{nome: req.user.nome, staff: req.user.isstaff, atualizacao: atts})
                }else{
                    res.render("index")
                }
            }else{
                if(req.user){
                    res.render("index",{nome: req.user.nome, staff: req.user.isstaff})
                }else{
                    res.render("index")
                }
            }
        }).catch((e)=>{
            if(req.user){
                res.render("index",{nome: req.user.nome, staff: req.user.isstaff})
            }else{
                res.render("index")
            }
        })

    })

    // Registro & Login
        app.get("/logout", (req,res)=>{
            req.logout(function(err){
                if(err){ return next(err)}
                res.redirect("/")
            })
        })
        app.get("/login",routeLoginAndRegister, (req,res)=>{
            res.render("user/login")
        })
        app.post("/login",routeLoginAndRegister, (req,res, next)=>{
            passport.authenticate("local",{
                successRedirect: "/",
                failureRedirect: "/login",
                failureFlash: true
            })(req,res,next)
        })
        app.get("/registro",routeLoginAndRegister, (req,res)=>{
            res.render("user/register")
        })
        app.post("/registro",routeLoginAndRegister, (req,res)=>{
            if(req.body.nome.length < 6){
                req.flash("error_msg", "Campo de nome muito curto, o mínimo são 6 caracteres.")
                res.redirect("/registro")
            }else{
                if(req.body.email.length < 6){
                    req.flash("error_msg", "Campo de email muito curto, o mínimo são 6 caracteres.")
                    res.redirect("/registro")
                }else{
                    if(req.body.senha.length < 6){
                        req.flash("error_msg", "Campo de senha muito curto, o mínimo são 6 caracteres")
                        res.redirect("/registro")
                    }else{
                        if(req.body.senha == req.body.senha2){
                            const novoUsuario = new Usuario({
                                nome: req.body.nome,
                                email: req.body.email,
                                senha: req.body.senha
                
                            })
                            bcrypt.genSalt(10,(erro, salt)=>{
                                bcrypt.hash(req.body.senha, salt,(erro,hash)=>{
                                    if(erro){
                                        req.flash("error_msg", "Erro interno no cadastro!")
                                        res.redirect("/")
                                    }else{
                                        novoUsuario.senha = hash 
                                        novoUsuario.save().then(()=>{
                                            req.flash("success_msg", "Conta criada com sucesso.")
                                            res.redirect("/login")
                                        }).catch((e)=>{
                                            req.flash("error_msg", "Erro interno no registro!")
                                            res.redirect("/registro")      
                                        })
                                    }
                                })
                            })
                        }else{
                            req.flash("error_msg", "Confirmação de senha inválida!")
                            res.redirect("/registro")
                        }
                    }
                }
            }
        })

    //Confirmar conta
        app.get("/confirmmta", (req,res)=>{
            Usuario.findOne({email: req.user.email}).then((usuario)=>{
                if(usuario){
                    if(usuario.isconfirm > 0){
                        res.redirect("/")
                    }else{
                        res.render("status/confirm",{validation: 0})
                    }
                }else{
                    res.redirect("/")
                }

            }).catch((erro)=>{
                req.flash("error_msg", "Erro interno ao tentar confirmar a conta.")
                res.redirect("/")
            })
        })
        app.post("/confirmmta",async (req,res)=>{

            if(req.body.conta.length < 4 ){
                req.flash("error_msg", "Nome da conta muito curta!")
                res.redirect("/confirmmta")
            }else if(req.body.key.length < 1){
                req.flash("error_msg", "Nome da palavra chave muito curta!")
                res.redirect("/confirmmta")
            }else{
                const verboseCallResult = await servidorMta.resources.brrhttp.brrconfirm(req.body.conta, req.body.key).then((player)=>{
                    if(player){
                        if(player != "success"){
                            req.flash("error_msg", player)
                            res.redirect("/confirmmta")
                        }else{
                            Usuario.findOne({email: req.user.email}).then((usuario)=>{
                                usuario.isconfirm = 1 
                                usuario.usuario = req.body.conta
                                usuario.save().then(()=>{
                                    req.flash("success_msg", "Conta vinculada com sucesso.")
                                    res.redirect("/")
                                }).catch((e)=>{
                                    req.flash("error_msg","Erro interno #02")
                                    res.redirect("/confirmmta")                          
                                })
                            }).catch((e)=>{
                                req.flash("error_msg","Erro interno.")
                                res.redirect("/confirmmta")
                            })
                        }
                    }
                }).catch((e)=>{
                    req.flash("error_msg", "Erro interno, tente novamente mais tarde!")
                    res.redirect("/confirmmta")
                })
            }

        })

    //On
    app.listen(PORT,()=>{
        console.log("Servidor rodando na porta " + PORT)
    })

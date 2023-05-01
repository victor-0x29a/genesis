
const PORT = 9999
const express = require('express')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const { default: mongoose } = require('mongoose')
const { allowedNodeEnvironmentFlags } = require('process')
require("./models/Postagem")
require("./models/Categoria")
const Categorias = mongoose.model("categorias")
const Postagens = mongoose.model("postagens")
const usuario = require("./routes/usuario")
const passport = require('passport')
const {eadmin} = require('./helpers/eadmin')
require("./config/auth")(passport)
    //Config
        //Sessao
        app.use(session({
            secret: "123@321",
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
        mongoose.connect("mongodb://localhost/blogdotiozao",{useNewUrlParser: true}).then(()=>{
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
    app.use('/admin',eadmin, admin)
    app.use('/usuario', usuario)
    app.get("/", (req,res)=>{
        Postagens.find().populate("categoria").sort({data: "desc"}).then((posts)=>{
            posts = posts.map(posts=>posts.toJSON())
            res.render("index", {data: posts})
        }).catch((e)=>{
            req.flash("error_msg", "Ocorrou um erro interno :( <br> Volte mais tarde!")
            res.redirect("/404")
        })
        
    })
    app.get("/404",(req,res)=>{
        res.send("Erro 404!")
    })
    app.get("/post/:slug", (req, res)=>{
        Postagens.findOne({slug: req.params.slug}).then((post)=>{
            console.log(post.titulo)
            res.render("postagem/index", {titulo: post.titulo, descricao: post.descricao,
            data: post.data, corpo: post.corpo})
        }).catch((e)=>{
            req.flash("error_msg", "Postagem inexistente.")
            res.redirect("/")
        })


    })
    app.get("/categorias", (req, res)=>{
        Categorias.find().then((categorias)=>{
            if(categorias.length <= 1){
                req.flash("error_msg", "Nenhuma categoria registrada")
            }else{
                res.render("postagem/categoria", {data: categorias.map(categorias=>categorias.toJSON())})
            }

        }).catch((e)=>{
            req.flash("error_msg", "Erro interno.")
            res.redirect("/")
        })
    })
    app.get("/categorias/:slug", (req,res)=>{
        Categorias.findOne({slug: req.params.slug}).then((categoria)=>{
            if(categoria){
                Postagens.find({categoria: categoria._id}).then((cat)=>{
                    res.render("postagem/categoriaselect", {data:cat.map(cat=>cat.toJSON()), categoria: categoria.nome})
                }).catch((e)=>{
                    req.flash("error_msg", "Erro interno.")
                    res.redirect("/")
                })
            }else{
                req.flash("error_msg", "Categoria inexistente!")
                res.redirect("/categorias")
            }
            
        }).catch((e)=>{
            req.flash("error_msg", "Erro interno.")
            res.redirect("/")
        })
    })

    //Outros

app.listen(PORT,()=>{
    console.log("Servidor iniciado na porta " + PORT)
})


const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
require('../models/Postagem')
require("../models/Usuario")
const Usuarios = mongoose.model("usuarios")
const Postagens = mongoose.model("postagens")
const Categorias = mongoose.model("categorias")
const bcrypt = require('bcryptjs')
const passport = require("passport")

router.get("/registro", (req,res)=>{
    res.render("usuario/registro")
})
router.post("/registro", (req,res)=>{
    if(req.body.nome.length < 4 || req.body.email.length < 4 || 
        req.body.senha.length < 4 || req.body.senha2.length < 4){
            req.flash("error_msg", "Confira os campos!")
            res.redirect("/usuario/registro")
        }else{
            if(req.body.senha == req.body.senha2){
                
                Usuarios.findOne({email: req.body.email}).then((user)=>{
                    if(user){
                        req.flash("error_msg", "Email ja esta em uso, tente outro.")
                        res.redirect("/usuario/registro")
                    }else{

                        const newUser = new Usuarios({
                            nome: req.body.nome,
                            email: req.body.email,
                            senha: req.body.senha
                        })

                        bcrypt.genSalt(10,(erro, salt)=>{
                            bcrypt.hash(req.body.senha, salt,(erro, hash)=>{
                                if(erro){
                                    req.flash("error_msg", "Erro interno.")
                                    res.redirect("/usuario/registro")
                                }else{
                                    newUser.senha = hash
                                    newUser.save().then(()=>{
                                        req.flash("success_msg","Usuario registrado.")
                                        res.redirect("/")
                                    }).catch((e)=>{
                                        console.log(e)
                                        req.flash("error_msg","Tente novamente.")
                                        res.redirect("/usuario/registro")
                                    })
                                }
                            })
                        })
                    }
                }).catch((e)=>{
                    req.flash("error_msg", "Erro interno ao tentar criar a conta.")
                    res.redirect("/registro")
                })

            }else{
                req.flash("error_msg", "Confirmação de senha inválida!")
                res.redirect("/registro")
            }
        }
})
router.get("/login",(req,res)=>{
    res.render("usuario/login")
})
router.post("/login",(req,res, next)=>{
    passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/usuario/login",
        failureFlash: true
    })(req,res,next)
})
router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err) }
        res.redirect('/')
      })
})


module.exports = router

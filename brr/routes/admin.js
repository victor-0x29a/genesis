const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
require('../models/Usuario')
require("../models/Log")
require("../models/Atualizacoes")
require("../models/Servidor")
const Logs = mongoose.model("logs")
const Usuario = mongoose.model("usuarios")
const Atualizacao = mongoose.model("atualizacoes")
const Servidor = mongoose.model("servidor")
const {adminProtection} = require("../helpers/protectroutes")
const Client = require("mtasa").Client
const servidorMta = new Client("127.0.0.1", 22005, "admin", "admin")


    //Multi Theft Auto
    async function start () {
        try {
            // Call some procedure
            const result = await servidorMta.resources.brrhttp.brrrequest("checksaldo","checksaldo")
            // Call a procedure (the alternative verbose API)
            const verboseCallResult = await servidorMta.call("brrhttp","brrrequest", "checksaldo");
        } catch (err) {
            console.error(`Ooops! Something went wrong ${err}`);
        }
    }

    //Useful
    const newLog = (msg) =>{
        const novoLog = new Logs({
            mensagem: msg
        })

        novoLog.save()
    }


    //Rotas
    router.get("/",adminProtection, (req,res)=>{
        Logs.find().sort({data: -1}).then((logs)=>{
            logsJson = logs.map(logs=>logs.toJSON())
            res.render("admin/index",{nome: req.user.nome, log: logsJson})
        }).catch((e)=>{
            res.render("admin/index",{nome: req.user.nome, log: 0})
        })
    })



    //Gerencia de staff
    router.get("/diretoria/staff",adminProtection, (req,res)=>{
        res.render("admin/diretoriastaff")
    })
    router.post("/staff/add",adminProtection, (req,res)=>{
        Usuario.findOne({email: req.body.email}).then((usuario)=>{
            if(usuario.isstaff == 1){
                req.flash("error_msg","O usuário já é administrador!")
                res.redirect("/admin/diretoria/staff")
            }else{
                Usuario.findOneAndUpdate({email: req.body.email}, {isstaff: 1, stafflevel: 4}).then(()=>{

                    req.flash("success_msg","Email adicionado como administrador!")
                    newLog(`${req.user.nome} removeu o email ${req.body.email} da lista de Staffs!`)
                    res.redirect("/admin/diretoria/staff")
                }).catch((err)=>{
                    req.flash("error_msg","Erro interno - admin exC00")
                    res.redirect("/admin/diretoria/staff")
                })
            }
                
            }).catch((err)=>{
                req.flash("error_msg", "Email não encontrado.")
                res.redirect("/admin/diretoria/staff")
            })
        })
    router.post("/staff/remove",adminProtection,(req,res)=>{
        Usuario.findOne({email: req.body.email}).then((usuario)=>{
            if(usuario.isstaff == 1){
                Usuario.findOneAndUpdate({email: req.body.email}, {isstaff: 0, stafflevel: 0}).then(()=>{
                    req.flash("success_msg","Email removido!")
                    newLog(`${req.user.nome} adicionou o email ${req.body.email} na lista de Staffs!`)
                    res.redirect("/admin/diretoria/staff")


                }).catch((err)=>{
                    req.flash("error_msg","Erro interno - admin exC01")
                    res.redirect("/admin/diretoria/staff")
                })
            }else{
                req.flash("error_msg", "Email cadastrado não é administrador!")
                res.redirect("/admin/diretoria/staff")
            }
        }).catch((err)=>{
            req.flash("error_msg", "Email não encontrado.")
            res.redirect("/admin/diretoria/staff")
        })
    })


   //Gerencia de membros 
    router.get("/membros",adminProtection, (req,res)=>{
        Usuario.find({isstaf: 0}).then((usuarios)=>{
            const cat = usuarios.map(usuarios=>usuarios.toJSON())
            res.render("admin/members", {dados: cat})
        }).catch((e)=>{
            req.flash("error_msg", "Erro interno!")
            res.redirect("/admin")
        })
    })

    router.get("/membros/remove/:id",adminProtection,(req,res)=>{
        Usuario.findOneAndDelete({_id: req.params.id}).then(()=>{
            req.flash("success_msg","Membro deletado com sucesso.")
            newLog(`${req.user.nome} Deletou a conta do ID ${req.params.id}`)
            res.redirect("/admin/membros")
        }).catch((err)=>{
            req.flash("error_msg", "Erro ao tentar deletar o membro, confira o ID! c00x03")
            newLog(`${req.user.nome} tentou deletar a conta do ID ${req.params.id}`)
            res.redirect("/admin/membros")
        })
    })
    router.get("/membros/:id/editar",adminProtection,(req,res)=>{
        Usuario.findOne({_id: req.params.id}).then((usuarioo)=>{
            res.render("admin/editperfil",{nome: usuarioo.nome, usuario: usuarioo.usuario, id: usuarioo._id})
        }).catch((e)=>{
            req.flash("error_msg", "Erro ao tentar ir para a edição.")
            res.redirect("/admin/membros")
        })
    })
    router.post("/membros/editar",adminProtection,(req,res)=>{
        Usuario.findOne({_id: req.body.id}).then((membro)=>{
            membro.nome = req.body.nome
            membro.usuario = req.body.usuario || null

            membro.save().then(()=>{
                req.flash("success_msg","Usuario Editado com sucesso")
                newLog(`${req.user.nome} Editou o perfil de ID ${req.body.id}`)
                res.redirect("/admin/membros")
            }).catch((e)=>{
                req.flash("error_msg", "Erro ao tentar editar o membro.")
                newLog(`${req.user.nome} tentou editar o perfil de id ${req.body.id}`)
                res.redirect("/admin/membros")
            })
        }).catch((e)=>{
            req.flash("error_msg", "Membro inexistente.")
            newLog(`${req.user.nome} tentou editar um perfil inexistente.`)
            res.redirect("/admin/membros")
        })
    })

    //Gerencia de Atualizacoes 
    router.get("/atualizacoes",adminProtection,(req,res)=>{
        Atualizacao.find().then((atts)=>{
            if(atts){
                res.render("admin/updates/index", {data: atts.map(atts=>atts.toJSON())})
            }
        }).catch((e)=>{
            res.render("admin/updates/index")
        })
    })
    router.get("/atualizacoes/criar",adminProtection, (req,res)=>{
        res.render("admin/updates/add")
    })
    router.post("/atualizacoes/criar",adminProtection,(req,res)=>{
        Atualizacao.findOne({slug: req.body.slug}).then((att)=>{
            if(att){
                req.flash("error_msg", "Atualização com o mesmo slug existente.")
                res.redirect("/admin/atualizacoes/criar")
            }else{
                if(req.body.titulo.length < 4){
                    req.flash("error_msg", "Titulo muito pequeno.")
                    res.redirect("/admin/atualizacoes/criar")
                }else{
                    if(req.body.sobre.length < 4){
                        req.flash("error_msg", "Texto muito pequeno.")
                        res.redirect("/admin/atualizacoes/criar")
                    }else{
                        if(req.body.slug.length < 4){
                            req.flash("error_msg", "Slug muito pequeno.")
                            res.redirect("/admin/atualizacoes/criar")
                        }else{
                            const newAtt = new Atualizacao({
                                titulo: req.body.titulo,
                                texto: req.body.sobre,
                                tipo: req.body.local,
                                slug: req.body.slug
                            })
                            newAtt.save().then(()=>{
                                req.flash("success_msg", "Atualização criada com sucesso.")
                                newLog(`${req.user.nome} criou uma atualização ${req.body.slug}`)
                                res.redirect("/admin/atualizacoes")
                            }).catch((e)=>{
                                req.flash("error_msg", "Erro interno. Ac001: " + e)
                                newLog(`${req.user.nome} tentou criar uma atualização`)
                                res.redirect("/admin/atualizacoes/criar")
                            })
                        }
                    }
                }
            }
        }).catch((e)=>{
            req.flash("error_msg", "Erro interno. Ac002: " + e)
            res.redirect("/admin/atualizacoes/criar")
        })
    })
    router.get("/atualizacoes/remove/:slug",adminProtection,(req,res)=>{
        Atualizacao.findOneAndDelete({slug: req.params.slug}).then(()=>{
            req.flash("success_msg", "Atualização apagada com sucesso.")
            newLog(`${req.user.nome} apagou uma atualização ${req.params.slug}`)
            res.redirect("/admin/atualizacoes")
        }).catch((e)=>{
            req.flash("error_msg", "Erro ao tentar apagar a atualização.")
            newLog(`${req.user.nome} tentou apagar uma atualização ${req.params.slug}`)
            res.redirect("/admin/atualizacoes")
        })
    })
    router.get("/atualizacoes/:slug/editar",adminProtection, (req,res)=>{

        Atualizacao.findOne({slug: req.params.slug}).then((att)=>{
            if(att){
                res.render("admin/updates/edit",{titulo: att.titulo, texto: att.texto, site: att.tipo, slug: att.slug})
            }else{
                req.flash("error_msg", "Atualização inexistente!")
                res.redirect("/admin/atualizacoes")
            }
        }).catch((e)=>{
            req.flash("error_msg", "Erro ao tentar editar uma atualização!")
            res.redirect("/admin/atualizacoes")
        })
    })
    router.post("/atualizacoes/:slug/editar",adminProtection, (req,res)=>{
        Atualizacao.findOne({slug: req.params.slug}).then((att)=>{
            if(att){
                if(req.body.slug.length < 4){
                    req.flash("error_msg", "Slug muito curto!")
                    res.redirect("/admin/atualizacoes")
                }else{
                    att.titulo = req.body.titulo
                    att.texto = req.body.sobre
                    att.tipo = req.body.local
                    att.slug = req.body.slug
    
                    att.save().then(()=>{
                        req.flash("success_msg", "Edição realizada com sucesso!")
                        res.redirect("/admin/atualizacoes")
                    }).catch((e)=>{
                        req.flash("error_msg", "Erro ao salvar edição!")
                        res.redirect("/admin/atualizacoes")
                    })
                }
            }else{
                req.flash("error_msg", "Atualização não encontrada.")
                res.redirect("/admin/atualizacoes")
            }
        }).catch((e)=>{
            req.flash("error_msg", "Erro interno.")
            res.redirect("/admin/atualizacoes")
        })
    })

    //Gerencia de Status
    router.get("/status",adminProtection,(req,res)=>{
        Servidor.findOne({identificacao: "brr"}).then((servidor)=>{
            res.render("admin/status/index",{status: servidor.status})
        }).catch((e)=>{
            req.flash("error_msg", "Erro interno!")
            res.redirect("/admin")
        })
    })
    router.get("/status/:option",adminProtection, (req,res)=>{
        Servidor.findOne({identificacao: "brr"}).then((servidor)=>{
            servidor.status = req.params.option
            servidor.save().then(()=>{
                newLog(`${req.user.nome} definiu o status do servidor como ${req.params.option}`)
                req.flash("success_msg", "Status definido com sucesso!")
                res.redirect("/admin/status")
            }).catch((e)=>{
                newLog(`${req.user.nome || "Estranho"} tentou atualizar o status do servidor.`)
                req.flash("error_msg", "Erro interno: " + e)
                res.redirect("/admin/status")
            })
        }).catch((e)=>{
            req.flash("error_msg", "Erro interno: " + e)
            res.redirect("/admin/status")
        })
    })

    //Comandos
    router.get("/comandos",(req,res)=>{
        res.render("admin/commands/index")
    })
    router.post("/comandos",async (req,res)=>{

        start()
        res.redirect("/admin/comandos")

    })



module.exports = router
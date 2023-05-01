const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
require('../models/Postagem')
const Postagens = mongoose.model("postagens")
const Categorias = mongoose.model("categorias")
const {eadmin} = require("../helpers/eadmin")

router.get("/", (req, res)=>{
    res.render("admin/index")
})
router.get("/postagens", (req, res)=>{
    Postagens.find().then((posts)=>{
        res.render("admin/postagem", {data: posts.map(posts=>posts.toJSON())})
    }).catch((e)=>{
        req.flash("Erro interno.")
    })
    
})
router.get("/addpostagens", (req, res)=>{
    Categorias.find().then((categorias)=>{

        res.render("admin/addpostagens", {data: categorias.map(categorias=>categorias.toJSON())})

    }).catch((e)=>{
        req.flash("error_msg", "Erro na listagem de postagens!")
        res.redirect("admin/postagem")
    })
    
})
router.get("/editpostagens/:id", (req,res)=>{
    Postagens.findOne({_id: req.params.id}).then((post)=>{
        let title = post.titulo
        let slug = post.slug
        let corpo = post.corpo
        res.render("admin/editpost", {titulo: title, slug: slug, corpo:corpo, id: req.params.id})
    }).catch((e)=>{
        req.flash("error_msg", "Ocorreu um erro ao tentar editar um post.")
        res.redirect("/admin/postagens")
    })
})
router.post("/editpostagens", (req, res)=>{
    Postagens.findOne({_id: req.body.id}).then((post)=>{
        post.titulo = req.body.titulo 
        post.corpo = req.body.texto 
        post.slug = req.body.slug 

        post.save().then(()=>{
            req.flash("success_msg", "Postagem editada com sucesso.")
            res.redirect("/admin/postagens")
        }).catch((e)=>{
            req.flash("error_msg", "Erro ao editar a postagem.")
            res.redirect("/admin/postagens")
        })
    })
})
router.post("/addpostagens", (req,res)=>{
    const newPost = {
        titulo: req.body.titulo, 
        corpo: req.body.texto,
        slug: req.body.slug,
        categoria: req.body.categoria.toString(),
        descricao: req.body.descricao
    }

    new Postagens(newPost).save().then(()=>{
        req.flash("success_msg", "Postagem criada.")
        res.redirect("/admin/postagens")
    }).catch((e)=>{
        console.log(e)
        req.flash("error_msg", "Erro ao criar postagem.")
        res.redirect("/admin/postagens")
    })



})
router.get("/removepost/:id", (req, res)=>{
    Postagens.findByIdAndDelete({_id: req.params.id}).then(()=>{
        req.flash("success_msg","Postagem deletada")
        res.redirect("/admin/postagens")
    }).catch((e)=>{
        req.flash("success_msg", "Erro ao tentar deletar uma postagem.")
        res.redirect("/admin/postagens")
    })
})
router.get("/categorias", (req,res)=>{
    Categorias.find().then((categorias)=>{
        cat = categorias.map(categorias=>categorias.toJSON())
        res.render("admin/categorias", {cat: cat})
    }).catch((e)=>{
        req.flash("error_msg", "Erro ao listar categorias.")
    })
    
})
router.get("/criarcategoria", (req,res)=>{
    res.render("admin/addcategoria")
})
router.get("/categorias/edit/:id", (req, res)=>{
    Categorias.findOne({_id:req.params.id}).then((categoria)=>{
        res.render("admin/editcategorias", {nome: categoria.nome, sobre: categoria.sobre, id: categoria.id,slug: categoria.slug})
    }).catch((e)=>{
        req.flash("error_msg", "Categoria inexistente.")
        res.redirect("/admin/categorias")
    })
})
router.get("/categorias/remove/:id", (req, res)=>{
    Categorias.findOneAndDelete({_id: req.params.id}).then(()=>{
        req.flash("success_msg", "Categoria excluida.")
        res.redirect("/admin/categorias")
    }).catch((e)=>{
        req.flash("error_msg", "Erro ao tentar excluir a categoria.")
        res.redirect("/admin/categorias")
    })
})
router.post("/categorias/edit", (req, res)=>{
    Categorias.findOne({_id: req.body.id}).then((e)=>{

        e.nome = req.body.categoria 
        e.slug = req.body.slug
        e.sobre = req.body.sobre 

        e.save().then(()=>{
            req.flash("success_msg", "Categoria editada.")
            res.redirect("/admin/categorias")
        }).catch(()=>{
            req.flash("error_msg", "Erro interno, tente novamente.")
            req.redirect("/admin/categorias")
        })
    }).catch((e)=>{
        console.log(e)
        req.flash("error_msg", "Erro ao editar a categoria.")
        res.redirect("/admin/categorias")
    })
})
router.post("/criarcategoria", (req,res)=>{

    let erros = [];
    if(req.body.categoria.length <= 2 || req.body.sobre.length <= 4){
        erros.push({texto: "Confira os campos."})
    }

    if(erros.length > 0){
        req.flash("error_msg", "Erro ao criar uma categoria.")
        res.render("admin/addcategoria",{erro: erros})
    }else{
        const newCategory = {
            nome: req.body.categoria,
            slug: req.body.slug,
            sobre: req.body.sobre
        }
    
        new Categorias(newCategory).save().then(()=>{
            req.flash("success_msg", "Categoria criada com sucesso.")
            res.redirect("/admin/categorias")
        }).catch((e)=>{
            req.flash("error_msg", "Erro ao criar uma categoria.")
            res.render("/admin/addcategoria", {erro: erros})
        })
    }
    
})

module.exports = router
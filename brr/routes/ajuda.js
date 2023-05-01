const express = require('express')
const router = express.Router()



    router.get("/", (req,res)=>{
        res.render("ajuda/index")
    })
    router.get("/confirmaccount", (req,res)=>{
        res.render("ajuda/confirmaccount")
    })







module.exports = router
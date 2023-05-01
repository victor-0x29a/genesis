const express = require('express')
const app = express()
const porta = 4778
const path = require('path')
const Chroma = require('razer-chroma-nodejs')


app.set("view engine", "ejs")
app.set("views", "src/views")
app.use(express.static(path.join("src/public")))
app.use(express.json())



app.get("/", async (req, res)=>{
    res.render('index', {})
})
app.post("/", async (req, res)=>{
    Chroma.util.init(()=>{
        console.log("Razer-CLI Funcionando corretamente")
        Chroma.effects.all.setColor(Chroma.colors.GREEN);
        setTimeout(() => {
            Chroma.util.close(() => {
              console.log("Chroma Editing Stopped");
            });
          }, 5000);
    })
})


app.listen(porta, ()=>{
    console.log(`Server running at http://localhost:${porta}`)
})
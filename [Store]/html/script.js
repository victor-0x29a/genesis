/* Switch De 'Paginas' */ 
const login = () =>{
    document.querySelector(".container").style.display = "none"
    document.querySelector(".container-login").style.display = "grid"
    document.body.style.backgroundImage = "url('./img/fundoperson.png')"
    document.querySelector("#nav-03").style.backgroundColor = "rgba(70,130,180)"
}

const main = ()=>{
    document.body.style.backgroundImage = "none"
    document.querySelector("#nav-03").style.backgroundColor = "rgb(51, 49, 49)"
    document.querySelector(".container").style.display = "flex"
    document.querySelector(".container-login").style.display = "none"
}


/* ------------</>----------- */


const attDiv = (a, b, c) =>{

    const divMae = document.querySelector(".vendas")
    let div = document.createElement("div")
    div.className = "separation"
    divMae.appendChild(div)
    let bloco = document.createElement("blockquote")
    let img = document.createElement("img")
    let nome = document.createElement("h2")
    let valor = document.createElement("h2")
    bloco.id = "item"
    nome.innerHTML = a
    valor.innerHTML = b
    img.src = c
    div.appendChild(bloco)
    bloco.appendChild(img)
    bloco.appendChild(nome)
    bloco.appendChild(valor)

}

document.addEventListener("DOMContentLoaded", ()=>{
    main()
    corpo = {
        "check": "check"
    }
    const configPost = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(corpo)
    }
    fetch('http://localhost:2022/attitens', configPost).then(r => r.json()).then(body=>{
        const divMae = document.querySelector(".vendas")
        let div = document.createElement("div")
        div.className = "separation"
        divMae.appendChild(div)
        for(i = 0; i < body.result.length; i++){
            let valorr = parseFloat(body.result[i]["valor"]) 
            let bloco = document.createElement("blockquote")
            let img = document.createElement("img")
            let nome = document.createElement("h2")
            let valor = document.createElement("h2")
            bloco.id = "item"
            nome.innerHTML = body.result[i]["nome"]
            valor.innerHTML = valorr.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            img.src = body.result[i]["img"]
            div.appendChild(bloco)
            bloco.appendChild(img)
            bloco.appendChild(nome)
            bloco.appendChild(valor)
        }
    })

})




let value_list = []




document.addEventListener('DOMContentLoaded', ()=>{
    let verify = localStorage.getItem("check")
    if(verify == null){
        localStorage.clear()
        window.location.replace("/html/index.html")
    }
    corpo = {
        "check": verify 
    }
    const configPost = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(corpo)
    }
    fetch("http://localhost:2022/islogged", configPost).then(r => r.json()).then(corpo=>{
        if(corpo.error == 0){
            document.querySelector("#welcome-message").innerHTML = "Olá " + corpo.nome
            atualizar("s")
        }else{
            localStorage.clear()
            window.location.replace("/html/index.html")
        }
    })
})

const atualizar = (type)    =>  {
    if(type == "s"){
        corpo = {
            "check": localStorage.getItem("check") 
        }
        const configPost = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(corpo)
        }
        fetch("http://localhost:2022/attvenda", configPost).then(r => r.json()).then(corpo=>{
            const lista = document.querySelector("#list-sallers")
            value_list.length = 0
            for(i = 0; i < corpo.result.length; i++){
                let valor1 = corpo.result[i]['valor']
                value_list.push(parseFloat(valor1))
                let valor2 = parseFloat(valor1).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                let div = document.createElement("div")
                let p1 = document.createElement("p")
                let p2 = document.createElement("p")
                let p3 = document.createElement("p")
                lista.appendChild(div)
                div.appendChild(p1)
                div.appendChild(p2)
                div.appendChild(p3)
                p1.innerHTML = corpo.result[i]['datad']
                p2.innerHTML = corpo.result[i]['hora']
                p3.innerHTML = valor2
                div.id = "item"
    
            }
            soma = 0
            for(i = 0; i < value_list.length; i++){ 
                soma += value_list[i]
            }
            document.querySelector("#lucro-message").innerHTML = soma.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        })
    }else{
        corpo = {
            "check": localStorage.getItem("check") 
        }
        const configPost = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(corpo)
        }
        fetch("http://localhost:2022/attvenda", configPost).then(r => r.json()).then(corpo=>{
            const lista = document.querySelector("#list-sallers")
            value_list.length = 0
            document.location.reload()
            for(i = 0; i < corpo.result.length; i++){
                let valor1 = corpo.result[i]['valor']
                value_list.push(parseFloat(valor1))
                let valor2 = parseFloat(valor1).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                let div = document.createElement("div")
                let p1 = document.createElement("p")
                let p2 = document.createElement("p")
                let p3 = document.createElement("p")
                lista.appendChild(div)
                div.appendChild(p1)
                div.appendChild(p2)
                div.appendChild(p3)
                p1.innerHTML = corpo.result[i]['datad']
                p2.innerHTML = corpo.result[i]['hora']
                p3.innerHTML = valor2
                div.id = "item"
    
            }
            soma = 0
            for(i = 0; i < value_list.length; i++){ 
                soma += value_list[i]
            }
            document.querySelector("#lucro-message").innerHTML = soma.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        })
    }

}



const login = ()=>{
    document.querySelector(".container").style.display = "none"
    document.querySelector(".container-login").style. display = "flex"
}

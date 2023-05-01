

const sendNota =    (a,b,c,d)  =>  {   
    const url = "http://localhost:2022/generatenota"
    const bodyResend = {
        cpf: a,
        valortotal: b,
        produtos: c,
        operantecaixa: d
    }
    const configPost = {
        method: 'POST',
        headers:    {   
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyResend)
    }
    fetch(url,configPost).then(r=>r.json()).then(corpo=>{
        if(corpo.y == 1){
            localStorage.setItem('Resstatus',1)
        }else{
            localStorage.setItem('Resstatus',2)
        }
    })
}



const searchList    =   ()  =>  {   
    let allItem = document.querySelector("#listas").textContent
    return allItem
}


const verifyGlobal = () =>  {
    let unknown = localStorage.getItem('unknown')
    let user = localStorage.getItem('Operador')
    if(unknown < 1 || unknown < 8 || unknown < 13){
        location.replace('index.html')
    }else{
        if(user == 'op1'){
            document.getElementById('userConnected').innerHTML = `Caixa 1`
        }else{
            if(user == 'op2'){
                document.getElementById('userConnected').innerHTML = `Caixa 2`
            }else{
                location.href('./index.html')
            }
        }
    }
}

verifyGlobal()

const limparCampos =    ()  =>  {   
    document.getElementById('ean-operador').value = ''
    document.getElementById('quant-operador').value = ''
    document.getElementById('linha').value = ''
}


let listinha = []
let u = 0





const requisitarDados = (nome, valor, estoqueAtual)  =>  {
    const quantidade = document.getElementById('quant-operador').value
    if(quantidade > estoqueAtual){
        alert(`Opa, a quantidade está maior que o estoque do produto. ${estoqueAtual}Un Disponíveis.`)
    }else{
        u++
        const total = Number.parseFloat(valor) * Number.parseInt(quantidade)
        const divMae = document.querySelector('#listas')
        let divLista = document.createElement('div')
        let h31 = document.createElement('h3')
        let h32 = document.createElement('h3')
        let h33 = document.createElement('h3')
        let h34 = document.createElement('h3')
        let h35 = document.createElement('h3')
    
        divMae.appendChild(divLista)
        divLista.className = `lista${u}`
        divLista.appendChild(h31)
        divLista.appendChild(h32)
        divLista.appendChild(h33)
        divLista.appendChild(h34)
        divLista.appendChild(h35)
        h31.innerHTML = nome 
        h32.innerHTML = `${valor} R$  ` 
        h33.innerHTML = `${quantidade} Un  `
        h34.innerHTML = `${u}  `
        h35.innerHTML = `${total.toFixed(2)} R$\n  `
        h31.className = 'itens1'
        h32.className = 'itens2'
        h33.className = 'itens3'
        h34.className = 'itens4'
        h35.className = 'itens5'
    
    
    
    
        listinha.push(total)
        let soma = 0
        for(i in listinha){
            soma += listinha[i]
        }
        localStorage.setItem("totalApi",soma.toFixed(2))
        document.getElementById('total-itens').innerHTML = `Total ${soma.toFixed(2)} R$ `
        limparCampos()
    }
}


const verifyCpf = (a)    =>   {   
    let [url, cpf] = ["http://localhost:2022/confirm",a]
    const bodyResend =  {
        cpf: cpf
    }
    const configPost = {
        method: 'POST',
        headers:    {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyResend)
    }
    fetch(url,configPost)
    .then(r=>r.json()).then(corpo=>{
        let dado = corpo.x
        localStorage.setItem("dado",dado)
    })

}


const coletarCompra =   ()  =>  {   
    let verify01 = prompt('Nota? 1 Sim - 2 Nao')
    if(verify01 == 1){
        let cpfClient = prompt('CPF')
        if(cpfClient < 12){
            alert("CPF INVALIDO!")
        }else{
            let result = verifyCpf(cpfClient)
            setTimeout(()=>{
                let confirma = localStorage.getItem("dado")
                if(confirma == 'true'){
                    let a = searchList()
                    let tramament1 = a.replace("Produto","")
                    let tramament2 = tramament1.replace("Valor","")
                    let tramament3 = tramament2.replace("Quantidade","")
                    let tramament4 = tramament3.replace("Id","")
                    let tramament5 = tramament4.replace("Total","")
                    let total = localStorage.getItem("totalApi")
                    let products = tramament5
                    let operator = localStorage.getItem("Operador")
                    let resLog = sendNota(cpfClient,total,products,operator)
                    setTimeout(()=>{
                        let resStatus = localStorage.getItem("Resstatus")
                        if(resStatus == 1){
                            alert('Compra confirmada.')
                            location.reload()
                        }else{
                            alert("Compra com falha.")
                            location.reload()
                        }
                    },1000)
                }else{
                    alert("Cliente Inexistente!")
                }
            },1000)
        }

    }else{
        if(verify01 == 2){
            cpfTwo = "Sem nota"
            let a = searchList()
            let tramament1 = a.replace("Produto","")
            let tramament2 = tramament1.replace("Valor","")
            let tramament3 = tramament2.replace("Quantidade","")
            let tramament4 = tramament3.replace("Id","")
            let tramament5 = tramament4.replace("Total","")
            let total = localStorage.getItem("totalApi")
            let products = tramament5
            let operator = localStorage.getItem("Operador")
            let resLog = sendNota(cpfTwo,total,products,operator)
            setTimeout(()=>{
                let resStatus = localStorage.getItem("Resstatus")
                if(resStatus == 1){
                    alert('Compra confirmada.')
                    location.reload()
                }else{
                    alert("Compra com falha.")
                    location.reload()
                }
            },1000)
        }else{
            alert('Tente novamente!')
        }
    }
}

const removerId =   ()  =>  {   
    const id = document.getElementById('linha').value
    if(id == '' || id == null || id == 0){
        alert('Coloque um ID valido!')
    }else{
        let idRemove = `lista${id}`
        let conteudo = document.querySelector(`.${idRemove}`)
        let conteudoTotal1 = conteudo.querySelector(".itens5").textContent
        let conteutoTotal2 = conteudoTotal1.replace("R$","")
        const retirarTotal =    ()  =>  {
            let search = Number.parseFloat(conteutoTotal2)
            let indice = listinha.indexOf(search)
            document.getElementById('total-itens').innerHTML = 'Aguardando...'
            while(indice >= 0){
                listinha.splice(indice, 1)
                let soma = 0
                for(i in listinha){
                    soma += listinha[i]
                    document.getElementById('total-itens').innerHTML = `Total ${soma.toFixed(2)} R$`
                }
                limparCampos()
                break
            }

        }
        retirarTotal()
        conteudo.parentNode.removeChild(conteudo)
    }
    
}


const pegarItem = ()    =>  {   
    if(document.getElementById('quant-operador').value < 1){
        alert('A quantidade de produtos, deve ser maior que zero.')
    }else{
        const url = "http://localhost:2022/caixa"
    const ean = document.getElementById('ean-operador').value
    if(ean.length < 12 || ean.length > 12){
        alert('Opa, EAN INVALIDO!')
    }else{
        const bodyResend =  {
            codigoDeBarras: ean
        }
        const configPost = {
            method: 'POST',
            headers:    {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyResend)
        }
        fetch(url, configPost).then(r   =>  r.json()).then(corpo=>  {
            let nomeProduto = `${corpo.dados[0].nome}  `
            let valorProduto = `${corpo.dados[0].valor}`
            let estoqueProduto = corpo.dados[0].estoque
            let quantiaProduto = `${document.getElementById('quant-operador').value}`
            requisitarDados(nomeProduto, valorProduto,estoqueProduto)
        })
    }
    }
}








const consultarHtml =   (nome,valor)  =>  { 
    const a = document.getElementById('locked').style.display = 'none'
    const b = document.getElementById('manipulateJs').style.display = 'none'
    const c = document.getElementById('nickk').innerHTML = nome
    const d = document.getElementById('valorr').innerHTML = `${valor} R$`
    const e = document.getElementById('divalert').style.display = 'flex' 
    setTimeout(()=>{    
        let a = document.getElementById('locked').style.display = 'flex'
        let b = document.getElementById('manipulateJs').style.display = 'flex'
        let c = document.getElementById('divalert').style.display = 'none'    
        limparCampos()
    },3000);

}


const consultarApi =   ()  =>  {   
    const url = "http://localhost:2022/caixa"
    const ean = document.getElementById('ean-operador').value
    if(ean.length < 12 || ean.length > 12){
        alert('Opa, EAN INVALIDO!')
    }else{
        const bodyResend =  {
            codigoDeBarras: ean
        }
        const configPost = {
            method: 'POST',
            headers:    {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyResend)
        }
        fetch(url, configPost).then(r   =>  r.json()).then(corpo=>  {
            let nomeProduto = corpo.dados[0].nome
            let valorProduto = corpo.dados[0].valor
            let estoqueProduto = corpo.dados[0].estoque
            let quantiaProduto = document.getElementById('quant-operador').value
            consultarHtml(nomeProduto,valorProduto)
        })
}
}



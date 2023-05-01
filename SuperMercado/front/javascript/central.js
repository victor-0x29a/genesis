
const logarOperador = ()    =>  {   
    const url = "http://localhost:2022/userrecon"
    const operador = document.getElementById('operator').value 
    const senha = document.getElementById('operatorpass').value 
    if(operador.length < 2 || senha.length < 2){
        document.getElementById('catch-html').innerHTML = 'Opa, algum dos campos é muito curto!'
        document.getElementById('catch-html').style.color = 'red'
    }else{  
        const bodyRequisicao = {
            name: operador,
            passwd: senha
        }
        const configPost = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyRequisicao)
        }
        fetch(url, configPost).then(response => response.json()).then(corpo=>{
            if(corpo.confirm == 1){
                localStorage.setItem('unknown',corpo.unknown)
                localStorage.setItem('Operador',operador)
                location.replace('operador.html')
            }else{
                document.getElementById('catch-html').innerHTML = 'Tente novamente.'
                document.getElementById('catch-html').style.color = 'red'
            }
        })
    }
}
function registerPanel(){
    document.getElementById('separate').style.display = 'none'
    document.getElementById('painel2').style.display = 'none'
    document.getElementById('painel0').style.display = 'flex'
    document.getElementById('painel3').style.display = 'flex'
}
function loginPanel(){
    document.getElementById('painel0').style.display = 'none'
    document.getElementById('painel3').style.display = 'none'
    document.getElementById('separate').style.display = 'flex'
    document.getElementById('painel2').style.display = 'flex'
} 

function clearCamps(){
    let nickGross = document.getElementById('usernameregister').value = ''


    let emailUser = document.getElementById('emailregister').value = ''

    let cpfGross = document.getElementById('cpfregister').value = ''


    let cepGross = document.getElementById('cepregister').value = '' 


    let addressGross = document.getElementById('enderegister').value = '' 


    let passwordUser = document.getElementById('passwordregister').value = '' 
    let passwordVerify = document.getElementById('passwordverify').value = '' 
}


let nada = 0;



function formataCPF(cpf){
    const elementoAlvo = cpf
    const cpfAtual = cpf.value   
    
    let cpfAtualizado;
    
    cpfAtualizado = cpfAtual.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, 
     function( regex, argumento1, argumento2, argumento3, argumento4 ) {
            return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
    })  
    elementoAlvo.value = cpfAtualizado
    }    

function formataCep(cep){
    const elementoAlvo = cep
    const cepAtual = cep.value 
    let cepAtualizado;
    if(cepAtual.includes("-")){
        nada;
    }else{
        cepAtualizado = cepAtual.replace(/(\d{5})/,function( argumento1){
            return argumento1 + '-';
        })
        elementoAlvo.value = cepAtualizado
    }  

}
    

const toBase64 = file => new Promise((resolve, reject)=>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})



function registerNewuser(){
    let nickGross = document.getElementById('usernameregister').value
    let nickUser = nickGross.replaceAll(' ','.')

    let emailUser = document.getElementById('emailregister').value

    let cpfGross = document.getElementById('cpfregister').value
    let cpfUser = cpfGross.replace(/\D+/g, '')

    let cepGross = document.getElementById('cepregister').value 
    let cepUser = cepGross.replaceAll('-','')

    let addressGross = document.getElementById('enderegister').value 
    let addressUser = addressGross.replaceAll(' ','.')

    let passwordUser = document.getElementById('passwordregister').value 
    let passwordVerify = document.getElementById('passwordverify').value 

    let fileresidencia = document.getElementById('imageresidencia').files[0]
    let filetshirt = document.getElementById('imagetshirt').files[0]
    let filedocument = document.getElementById('imagedocument').files[0]

    toBase64(fileresidencia).then(res =>{
        localStorage.setItem('arquivoresidencia',res)
    }).then(err =>{
        nada;
    })
    toBase64(filetshirt).then(res =>{
        localStorage.setItem('arquivocamisa',res)
    }).then(err =>{
        nada;
    })
    toBase64(filedocument).then(res=>{
        localStorage.setItem('arquivodocumento',res)
    }).then(err =>{
        nada;
    })
    if(nickGross.length == 0 || emailUser.length == 0 || cpfGross.length == 0 || cepGross.length == 0 || addressGross.length == 0 || passwordUser.length == 0 || passwordVerify == 0){
        document.getElementById('catch').innerHTML = "Verifique se todos os campos estão preenchidos!"
        document.getElementById('catch').style.color = 'red'
        document.getElementById('catch').style.marginTop = '15px'
        document.getElementById('bloco3').style.height = '1050px'
    }else{
        if(localStorage.getItem('arquivoresidencia') == false){
            document.getElementById('catch').innerHTML = "A imagem do comprovante de residência está faltando!"
            document.getElementById('catch').style.color = 'red'
            document.getElementById('catch').style.marginTop = '15px'
            document.getElementById('bloco3').style.height = '1050px'   
        }else{
            if(localStorage.getItem('arquivocamisa') == false){
                document.getElementById('catch').innerHTML = "A sua foto de camisa branca, está faltando!"
                document.getElementById('catch').style.color = 'red'
                document.getElementById('catch').style.marginTop = '15px'
                document.getElementById('bloco3').style.height = '1050px'  
            }else{
                if(localStorage.getItem('arquivodocumento') == false){
                    document.getElementById('catch').innerHTML = "A sua foto com o documento na mão está faltando!"
                    document.getElementById('catch').style.color = 'red'
                    document.getElementById('catch').style.marginTop = '15px'
                    document.getElementById('bloco3').style.height = '1050px'  
                }else{
                    if(passwordUser == passwordVerify){
                        if(cpfUser.length < 11 || cpfUser.length > 11){
                            document.getElementById('catch').innerHTML = "Verifique seu CPF!"
                            document.getElementById('catch').style.color = 'red'
                            document.getElementById('catch').style.marginTop = '15px'
                            document.getElementById('bloco3').style.height = '1050px'  
                        }else{
                            if(passwordVerify.length < 6){
                                document.getElementById('catch').innerHTML = "Atenção, sua senha é muito pequena, o mínimo é seis caracteres!"
                                document.getElementById('catch').style.color = 'red'
                                document.getElementById('catch').style.marginTop = '15px'
                                document.getElementById('bloco3').style.height = '1050px'  
                            }else{
                                if(addressUser.length < 4){
                                    document.getElementById('catch').innerHTML = "Verifique seu CEP!"
                                    document.getElementById('catch').style.color = 'red'
                                    document.getElementById('catch').style.marginTop = '15px'
                                    document.getElementById('bloco3').style.height = '1050px' 
                                }else{
                                    if(cepUser.length < 8 || cepUser.length > 8){
                                        document.getElementById('catch').innerHTML = "Verifique seu CEP!"
                                        document.getElementById('catch').style.color = 'red'
                                        document.getElementById('catch').style.marginTop = '15px'
                                        document.getElementById('bloco3').style.height = '1050px'  
                                    }else{

                                        /*so consumir a api a partir daqui*/
                                        /*as imagens ficam salva no localstorage */
                                        let residenciaBase6 = window.localStorage.getItem('arquivoresidencia')
                                        let camisaBase6 = window.localStorage.getItem('arquivocamisa')
                                        let comdocBase6 = window.localStorage.getItem('arquivodocumento')
    
                                        let residenciaBase64 = residenciaBase6.replaceAll('/','>')
                                        let camisaBase64 = camisaBase6.replaceAll('/','>')
                                        let comdocBase64 = comdocBase6.replaceAll('/','>')
                                    
                                        document.getElementById('catch').innerHTML = 'Parabens, concluiu o registro'
                                        document.getElementById('catch').style.color = 'green'
                                        document.getElementById('catch').style.marginTop = '15px'
                                        document.getElementById('bloco3').style.height = '1050px'
                                        clearCamps()
                                    }
                                }
                            }
                        }
                    }else{
                        document.getElementById('catch').innerHTML = "Sua confirmação de senha está incoerente!"
                        document.getElementById('catch').style.color = 'red'
                        document.getElementById('catch').style.marginTop = '15px'
                        document.getElementById('bloco3').style.height = '1050px'  
                    }
                }
            }
        }
    }
}
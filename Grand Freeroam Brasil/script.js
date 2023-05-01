function checkbox(){
    let campo = document.getElementById("userSenha")
    if(campo.type === "password"){
        //pass
    }
    else{
        campo.type = "password"
    }
    let valorSenha = document.getElementById("userSenha").value
    let imagem = document.querySelector("#img")
    if(valorSenha.length > 4){
        imagem.style.display = "inline"
    }else{
        imagem.style.display = "none"
    }
}

function checkSenha(){
    let Senha = document.getElementById("userSenha")
    if(Senha.type === "password"){
        Senha.type = "text"
    }else{
        Senha.type = "password"
    }
}

const formLogin = document.querySelector(".login-form")
const formRegister = document.querySelector(".register-form")
const loginButton = document.querySelector(".content-01")
const registerButton = document.querySelector(".content-02")

const loginUnder = document.querySelector(".h11")
const registerUnder = document.querySelector(".h12")



loginButton.addEventListener("click", ()=>{
    formLogin.style.transform = "rotateY(0)"
    formRegister.style.transform = "rotateY(90deg)"
    loginUnder.style.textDecoration = "underline"
    loginUnder.style.color = "red"
    registerUnder.style.color = "white"
    registerUnder.style.textDecoration = "none"
})

registerButton.addEventListener("click", ()=>{
    formLogin.style.transform = "rotateY(90deg)"
    formRegister.style.transform = "rotateY(0)"
    loginUnder.style.textDecoration = "none"
    loginUnder.style.color = "white"
    registerUnder.style.color = "red"
    registerUnder.style.textDecoration = "underline"
})


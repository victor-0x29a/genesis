













addEventListener("submit",()=>{
    return false
})
const logar = ()=>{
    const email = document.getElementById("login-email").value
    const senha = document.getElementById("login-senha").value
    if(email.length != 0 && senha.length != 0){
        body = {
            email: document.querySelector("#login-email").value,
            senha: document.querySelector("#login-senha").value
        }
        const option = {
            method: "POST", 
            body: JSON.stringify(body), 
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }
        fetch("/", option)
    }
}


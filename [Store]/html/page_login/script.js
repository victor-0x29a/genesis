let alertSec = 0

const alert = (msg) =>{
    if(alertSec > 0){
        return false
    }
    alertSec = 1
    document.querySelector(".alert-box").style.display = "flex"
    document.querySelector(".alert-box").style.animation = "alert 3s ease-in-out"
    document.querySelector("#alert-message").innerHTML = msg
    setInterval(() => {
        document.querySelector(".alert-box").style.animation = "alertLeave 3s ease-in-out"
        setInterval(()=>{
            document.querySelector(".alert-box").style.display = "none"
            alertSec = 0
        }, 2000)
    }, 6000);
}






const connectApi = (url, body)  =>  {
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))
    return request.responseText

}






let formulario = document.querySelector(".form")
formulario.addEventListener("submit", function(e){
    e.preventDefault()
    let campOne = document.querySelector("#login-form-content-user")
    let campTwo = document.querySelector("#login-form-content-pass")
    if(campOne.value.length < 6){
        campOne.style.border = "1px solid red"
    }else{
        if(campTwo.value.length < 6){
            campTwo.style.border = "1px solid red"
        }else{
            corpo = {
                "user": campOne.value,
                "pass": campTwo.value
            }
            const postConfig = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(corpo)
            }
            fetch("http://localhost:2022/manager", postConfig).then(response=>response.json()).then(corpo=>{
                if(corpo.error == 1){
                    alert("Usuario inexistente!")
                }else if(corpo.error == 2){
                    alert("Senha incorreta!")
                }else{
                    localStorage.setItem('check', corpo.checkpoint)
                    document.location.replace('D:/Projetos/Login com Database/html/logged/index.html')
                }
            })
        }
    }
})



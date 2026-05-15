import { addSession } from "../utils/sessionStorage.controller.js"
import { alert,handlealert,handleCloseAlert } from "../components/alert.js"

const btnlogin = document.getElementById('btnlogin')
const alertContainer =document.getElementById('alert_container')

alertContainer.innerHTML = alert()

const btnCloseAlert = document.getElementById('btnCloseAlert')

const auth = async({name, pass})=>{
    const user = await fetch('http://localhost:3000/user/login',{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"username":name, "pass":pass})
    }).then((res)=>{
        if(!res.ok){
            throw new Error('Error en la peticion')
        }
        return res.json()
    }).catch(error =>{
        console.log('Error:',error)
        throw new Error('Error en la peticion')
    })

    return user
}

btnCloseAlert.addEventListener('click', ()=>{
    handleCloseAlert()
})
btnlogin.addEventListener('click', async()=>{
    const name = document.getElementById('txtname').value
    const pass = document.getElementById('txtpass').value

    if(name != '' && pass != ''){
        try{
            const user = await auth({name,pass})
            addSession(user)
            window.location.href="../pages/tienda.html"
        }catch(error){
            handlealert('Hubo un problema para iniciar sesion')
        }
    }else{
        handlealert('Hay campos imcompletos')
    }
})
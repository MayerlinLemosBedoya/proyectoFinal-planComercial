const btnChiste=document.getElementById("btnChistes")
const chiste= document.getElementById("chistes")

btnChiste.addEventListener("click",generarChiste)

async function generarChiste(){
     try {
        let res= await fetch("https://icanhazdadjoke.com/",{
            headers:{
                "Accept":"application/json"
            }
          })
          const data=await res.json()
          console.log(data)
          chiste.innerHTML=data.joke
} catch(error) {
    console.error(error)
}
}
    

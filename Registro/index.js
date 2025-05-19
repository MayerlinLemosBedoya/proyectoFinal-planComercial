document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); 

        const nombre = document.getElementById("nombres").value;
        const apellidos = document.getElementById("apellidos").value;
        const correo = document.getElementById("correo").value;
        const contraseña = document.getElementById("contraseña").value;

        
        if (!nombre || !apellidos || !correo || !contraseña) {
            alert("Por favor, complete todos los campos.");
        } else {
            alert(`Bienvenido, ${nombre}!`);
    
        }
    });
});

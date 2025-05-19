document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#miFormulario");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); 

        const nombre = document.getElementById("nombres").value;
        const apellidos = document.getElementById("apellidos").value;
        const correo = document.getElementById("correo").value;
        const contraseña = document.getElementById("contraseña").value;

        if (!nombre || !apellidos || !correo || !contraseña) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const datos = { nombre, apellidos, correo, contraseña };

       fetch("http://localhost:3000/api/registro", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        })
        .then(response => {
            if (!response.ok) throw new Error("Error del servidor");
            return response.json();
        })
        .then(data => {
            alert(`Bienvenido a plan comercial, ${nombre}!`);
            form.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Ocurrió un error al enviar el formulario.");
        });
    });
});


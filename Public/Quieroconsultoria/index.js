document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("formulario");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombres").value;
        const apellidos = document.getElementById("apellidos").value;
        const correo = document.getElementById("correo").value;
        const texto = document.getElementById("texto").value;

        if (!nombre || !apellidos || !correo || !texto) {
            alert("Por favor, complete todos los campos.");
            return;
        }
        try {
            const respuesta = await fetch("/procesar-formulario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombres: nombre, apellidos, correo, texto }),
            });

            const mensaje = await respuesta.text();
            alert(mensaje);
        } catch (error) {
            alert("Error al enviar el formulario.");
            console.error(error);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const inputNombre = document.getElementById("id-usuario");
    const btnEntrar = document.getElementById("boton-enviar");

    btnEntrar.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();

        if (!nombre) {
            alert("Ingresá tu nombre para continuar");
            return;
        }

        // Guardo el nombre en el navegador
        localStorage.setItem("clienteNombre", nombre);

        // Redirijo a la página de productos
        window.location.href = "Productos.html";
        
    });
    btnAdmin.addEventListener("click", () => {
        window.location.href = "http://localhost:3000/"; 
    });
});
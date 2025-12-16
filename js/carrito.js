document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("carrito-items");
    const spanTotal = document.getElementById("carrito-total");
    const btnVaciar = document.getElementById("btn-vaciar");
    const btnFinalizar = document.getElementById("btn-finalizar");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function guardarYCargar(){
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
    }

    function renderCarrito() {
        tbody.innerHTML = "";
        let total = 0;

        if(carrito.length === 0){
            tbody.innerHTML = `<tr><td colspan="5">El carrito está vacío.</td></tr>`;
            spanTotal.textContent = "$0";
            return;
        }

        carrito.forEach((item, index) => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.nombre}</td>

                <td><button class="btn-eliminar" data-index="${index}">Eliminar</button></td>

                <td>${item.cantidad}</td>
                <td>$${item.precio}</td>
                <td>$${subtotal}</td>
            `;
            tbody.appendChild(tr);
        });

        spanTotal.textContent = `$${total}`;

        // Activar botones eliminar
        document.querySelectorAll(".btn-eliminar").forEach(btn => {
            btn.addEventListener("click", () => {
                const i = btn.dataset.index;
                carrito.splice(i, 1);
                guardarYCargar();
            });
        });
    }

    // Vaciar carrito completo
    btnVaciar.addEventListener("click", () => {
        carrito = [];
        guardarYCargar();
    });

    // Finalizar compra → ticket
    btnFinalizar.addEventListener("click", () => {
        if(carrito.length === 0){
            alert("El carrito está vacío.");
            return;
        }

        const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

        const nombreCliente = localStorage.getItem("clienteNombre") || "Invitado";

        const ticket = {
            cliente: nombreCliente,
            fecha: new Date().toLocaleString(),
            items: carrito.map(item => ({
                nombre: item.nombre,
                cantidad: item.cantidad,
                subtotal: item.precio * item.cantidad
            })),
            total
        };

        localStorage.setItem("ticket", JSON.stringify(ticket));
        carrito = [];
        guardarYCargar();
        window.location.href = "ticket.html";
    });

    renderCarrito();
});

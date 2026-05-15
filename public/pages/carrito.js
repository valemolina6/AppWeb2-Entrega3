const lista = document.getElementById('lista-carrito');
const totalLabel = document.getElementById('total');
const btn = document.getElementById('btnComprar');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function pintar() {
    lista.innerHTML = '';
    let t = 0;
    cart.forEach((p, i) => {
        t += p.precio;
        lista.innerHTML += `<div class="flex justify-between border-b p-2">
            <span>${p.nombre}</span> <span>$${p.precio}</span>
            <button onclick="borrar(${i})" class="text-red-500">X</button>
        </div>`;
    });
    totalLabel.innerText = t;
}

window.borrar = (i) => {
    cart.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    pintar();
};

btn.addEventListener('click', async () => {
    
    if (cart.length === 0) {
        alert("El carrito está vacío. ¡Añade algunos productos antes de comprar!");
        return; 
    }

    const user = JSON.parse(sessionStorage.getItem('user'));
    
    try {
        const res = await fetch('/ventas/checkout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ productos: cart, usuario: user?.username || "anonimo" })
        });

        if (res.ok) {
            alert("¡Gracias por tu compra!");
            localStorage.removeItem('cart');
            window.location.href = 'tienda.html';
        } else {
            alert("Hubo un error al procesar tu compra.");
        }
    } catch (error) {
        console.error("Error en la compra:", error);
        alert("No se pudo conectar con el servidor.");
    }
});

pintar();
const grid = document.getElementById('grid-productos');
const filtro = document.getElementById('filtro');
let prods = [];


async function cargar() {
    try {
        const res = await fetch('/productos/todos');
        prods = await res.json();
        render(prods);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}


function render(lista) {
    grid.innerHTML = '';
    
    if (lista.length === 0) {
        grid.innerHTML = '<p class="text-center col-span-3 text-gray-500">No se encontraron productos cargados en MongoDB.</p>';
        return;
    }

    lista.forEach(p => {
        const card = document.createElement('div');
        card.className = "bg-white p-4 rounded shadow text-center flex flex-col justify-between";
        card.innerHTML = `
            <div class="mb-4">
                <img src="${p.imagen}" alt="${p.nombre}" class="w-full h-40 object-cover mb-4 rounded">
                <h3 class="font-bold text-lg">${p.nombre}</h3>
                <p class="text-gray-500 text-sm mb-2">${p.categoria}</p>
                <p class="text-red-600 font-bold text-xl">$${p.precio}</p>
            </div>
            <button onclick="agregar('${p._id}')" class="bg-red-500 hover:bg-red-600 text-white p-2 w-full rounded transition-colors font-medium">
                Añadir al carrito
            </button>
        `;
        grid.appendChild(card);
    });
}


filtro.addEventListener('change', (e) => {
    const val = e.target.value;
    render(val === "Todos" ? prods : prods.filter(p => p.categoria === val));
});


window.agregar = (id) => {
    const p = prods.find(x => x._id === id);
    if (!p) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    
    const existe = cart.find(item => item._id === id);
    if (existe) {
        existe.cantidad = (existe.cantidad || 1) + 1;
    } else {
        cart.push({ ...p, cantidad: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${p.nombre} agregado al carrito con éxito!`);
};


cargar();
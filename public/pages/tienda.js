const grid = document.getElementById('grid-productos');
const filtro = document.getElementById('filtro');
let prods = [];

async function cargar() {
    const res = await fetch('/productos/todos');
    prods = await res.json();
    render(prods);
}

function render(lista) {
    grid.innerHTML = '';
    lista.forEach(p => {
        const card = document.createElement('div');
        card.className = "bg-white p-2 rounded shadow text-center";
        card.innerHTML = `
            <img src="${p.imagen}" class="w-full h-40 object-cover mb-4">
            <h3 class="font-bold">${p.nombre}</h3>
            <p class="text-red-600">$${p.precio}</p>
            <button onclick="agregar(${p.id})" class="bg-red-500 text-white p-1 mt-2 w-full rounded">Añadir</button>
        `;
        grid.appendChild(card);
    });
}

filtro.addEventListener('change', (e) => {
    const val = e.target.value;
    render(val === "Todos" ? prods : prods.filter(p => p.categoria === val));
});

window.agregar = (id) => {
    const p = prods.find(x => x.id === id);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(p);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Agregado!");
};

cargar();
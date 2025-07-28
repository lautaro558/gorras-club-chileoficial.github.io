const productos = [{ id: 1, nombre: "Gorra New Era New York Yankees 940", precio: 18500, imagen: "gorra1.jpg", stock: 6 },
{ id: 2, nombre: "Gorra Hang Loose 3D", precio: 18500, imagen: "gorra2.jpg", stock: 7 },
{ id: 3, nombre: "Gorra Under Armour Blitzing", precio: 18500, imagen: "gorra3.jpg", stock: 8 },
{ id: 4, nombre: "Gorra Adidas Climacool Sport Trucker", precio: 18500, imagen: "gorra4.jpg", stock: 9 },
{ id: 5, nombre: "Gorra Topper Basico", precio: 18500, imagen: "gorra5.jpg", stock: 10 },
{ id: 6, nombre: "Gorra Nike Club", precio: 18500, imagen: "gorra6.jpg", stock: 11 },
{ id: 7, nombre: "Gorra Hang Loose Honey", precio: 18500, imagen: "gorra7.jpg", stock: 12 },
{ id: 8, nombre: "Gorra Hang Loose 3D", precio: 18500, imagen: "gorra8.jpg", stock: 13 },
{ id: 9, nombre: "Gorra Adidas Climacool", precio: 18500, imagen: "gorra9.jpg", stock: 14 },
{ id: 10, nombre: "Gorra Adidas Plegable Heat.Rdy X-City", precio: 18500, imagen: "gorra10.jpg", stock: 5 },
{ id: 11, nombre: "Gorra Under Armour Launch", precio: 18500, imagen: "gorra11.jpg", stock: 6 },
{ id: 12, nombre: "Gorra Under Armour Branded Hat", precio: 18500, imagen: "gorra12.jpg", stock: 7 },
{ id: 13, nombre: "Gorra Under Armour Branded Hat", precio: 18500, imagen: "gorra13.jpg", stock: 8 },
{ id: 14, nombre: "Gorra Under Armour Isochill Run Dash", precio: 18500, imagen: "gorra14.jpg", stock: 9 },
{ id: 15, nombre: "Gorra New Era 940 Kansas City Chiefs NFL", precio: 18500, imagen: "gorra15.jpg", stock: 10 },
{ id: 16, nombre: "Gorra New Era New York Yankees MLB Basic 59FIFTY", precio: 18500, imagen: "gorra16.jpg", stock: 11 },
{ id: 17, nombre: "Gorra New Era New York Yankees League Essential 9FORTY", precio: 18500, imagen: "gorra17.jpg", stock: 12 },
{ id: 18, nombre: "Gorra New Era Los Angeles Dodgers 940", precio: 18500, imagen: "gorra18.jpg", stock: 13 },
{ id: 19, nombre: "Gorra New Era New York Yankees 940", precio: 18500, imagen: "gorra19.jpg", stock: 14 },
{ id: 20, nombre: "Gorra New Era New York Yankees 940 MLB", precio: 18500, imagen: "gorra20.jpg", stock: 5 },
{ id: 21, nombre: "Gorra New Era Chicago White Sox 9FORTY", precio: 18500, imagen: "gorra21.jpg", stock: 6 },
{ id: 22, nombre: "Gorra Nike DF Club", precio: 18500, imagen: "gorra22.jpg", stock: 7 },
{ id: 23, nombre: "Gorra Nike DF Club", precio: 18500, imagen: "gorra23.jpg", stock: 8 },
{ id: 24, nombre: "Gorra Nike Dry FIT ADV Club", precio: 18500, imagen: "gorra24.jpg", stock: 9 },
{ id: 25, nombre: "Gorra Nike DF Club Cap", precio: 18500, imagen: "gorra25.jpg", stock: 10 }];

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  actualizarCarrito();
});

function cargarProductos() {
  const contenedor = document.getElementById("productos");
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" />
      <h3>${prod.nombre}</h3>
      <p>$${prod.precio}</p>
      <p>Stock: ${prod.stock}</p>
      <button class="boton" onclick="agregarAlCarrito(${prod.id})">Agregar</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  // Calcular cantidad total actual en el carrito
  const totalCantidad = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);

  if (totalCantidad >= 5) {
    alert("¡No puedes agregar más de 5 productos en total al carrito!");
    return;
  }

  const item = carrito.find(p => p.id === id);
  if (item) {
    // Verificar si al aumentar 1 supera el límite de 5
    if (totalCantidad + 1 > 5) {
      alert("¡No puedes agregar más de 5 productos en total al carrito!");
      return;
    }
    item.cantidad++;
  } else {
    carrito.push({ ...productos.find(p => p.id === id), cantidad: 1 });
  }
  actualizarCarrito();
}


function actualizarCarrito() {
  const contenedor = document.getElementById("items-carrito");
  contenedor.innerHTML = "";
  let total = 0;
  let cantidad = 0;
  carrito.forEach(prod => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${prod.nombre} x${prod.cantidad} - $${prod.precio * prod.cantidad}
      <button onclick="eliminarDelCarrito(${prod.id})">❌</button>
    `;
    contenedor.appendChild(div);
    total += prod.precio * prod.cantidad;
    cantidad += prod.cantidad;
  });
  document.getElementById("total").innerText = total;
  document.getElementById("contador-carrito").innerText = cantidad;
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  actualizarCarrito();
}

function toggleCarrito() {
  document.getElementById("carrito").classList.toggle("abierto");
}

function filtrarProductos() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  productos
    .filter(p => p.nombre.toLowerCase().includes(texto))
    .forEach(prod => {
      const div = document.createElement("div");
      div.className = "producto";
      div.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}" />
        <h3>${prod.nombre}</h3>
        <p>$${prod.precio}</p>
        <p>Stock: ${prod.stock}</p>
        <button class="boton" onclick="agregarAlCarrito(${prod.id})">Agregar</button>
      `;
      contenedor.appendChild(div);
    });
}
function irAPago() {
  const totalCantidad = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  if (totalCantidad === 0) {
    alert("El carrito está vacío.");
    return;
  }
  localStorage.setItem("cantidadProductos", totalCantidad);
  window.location.href = "pago.html";
}



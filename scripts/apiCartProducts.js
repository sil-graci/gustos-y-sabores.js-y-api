document.addEventListener("DOMContentLoaded", () => {
  // Obtener elementos del DOM
  const contenedorTarjetas = document.getElementById("cart-container");
  const cantidadElement = document.getElementById("cantidad");
  const precioElement = document.getElementById("precio");
  const carritoVacioElement = document.getElementById("carrito-vacio");
  const continuarCompraElement = document.getElementById("continuar-compra");

  /** Crea las tarjetas de productos usando los datos guardados en localStorage */
  function crearTarjetasProductosCarrito() {
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("seleccionados")) || [];
    console.log(productos);
    
    if (productos.length > 0) {
      carritoVacioElement.style.display = "none";
      continuarCompraElement.style.display = "block";
      let totalCantidad = 0;
      let totalPrecio = 0;

      productos.forEach((producto, i) => {
        const nuevoItem = document.createElement("div");
        nuevoItem.classList.add("producto-carrito");
        nuevoItem.innerHTML = `
          <div class="card-body">
            <h4>${producto.product_name}</h4> 
            <img src="${producto.image_url}" alt="${producto.product_name}"> 
            <p class="precio">$${producto.precio}</p>
            <div class="mas">
              <button class="decrementar">-</button>
              <span>${producto.cantidad}</span>
              <button class="incrementar">+</button>
            </div>
          </div>
        `;
        contenedorTarjetas.appendChild(nuevoItem);

        // Añadir los event listeners a los botones de incrementar y decrementar
        nuevoItem.querySelector(".decrementar").addEventListener("click", () => cambiarCantidad(i, -1));
        nuevoItem.querySelector(".incrementar").addEventListener("click", () => cambiarCantidad(i, 1));

        totalCantidad += producto.cantidad;
        totalPrecio += producto.cantidad * (producto.precio || 0);
      });

      cantidadElement.textContent = totalCantidad;
      precioElement.textContent = totalPrecio.toFixed(2);


    } else {
      carritoVacioElement.style.display = "block";
      continuarCompraElement.style.display = "none";
      cantidadElement.textContent = "0";
      precioElement.textContent = "0.00";
    }
  }

  /** Cambia la cantidad de un producto en el carrito */
  function cambiarCantidad(index, cambio) {
    const productos = JSON.parse(localStorage.getItem("seleccionados")) || [];
    if (productos[index]) {
      productos[index].cantidad += cambio;
      if (productos[index].cantidad <= 0) {
        productos.splice(index, 1);
      }
      localStorage.setItem("seleccionados", JSON.stringify(productos));
      crearTarjetasProductosCarrito();
      actualizarNumeroCarrito();
    }
  }

  /** Actualiza el número de productos en el ícono del carrito */
  function actualizarNumeroCarrito() {
    const productos = JSON.parse(localStorage.getItem("seleccionados")) || [];
    const totalProductos = productos.reduce((total, producto) => total + producto.cantidad, 0);
    document.getElementById("cuenta-carrito").textContent = totalProductos;
  }

  /** Reinicia el carrito */
  document.getElementById("reiniciar").addEventListener("click", () => {
    localStorage.removeItem("seleccionados");
    crearTarjetasProductosCarrito();
    cantidadElement.textContent = "0";
    precioElement.textContent = "0.00";
    actualizarNumeroCarrito();
  });

  /** Inicializa la página del carrito */
  crearTarjetasProductosCarrito();
  actualizarNumeroCarrito();
});

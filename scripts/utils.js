function actualizarNumeroCarrito() {
    const memoria = JSON.parse(localStorage.getItem("seleccionados")) || [];
    const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    document.getElementById("cuenta-carrito").textContent = cuenta;
  }
  
  // Exponer la función al ámbito global
  window.actualizarNumeroCarrito = actualizarNumeroCarrito;
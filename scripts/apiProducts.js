document.addEventListener("DOMContentLoaded", () => {
  fetch('https://world.openfoodfacts.org/cgi/search.pl?search_terms=snack&json=true&lc=es')
    .then(response => response.json())
    .then(data => {
      if (data.products && data.products.length > 0) {
        const productos = data.products.slice(0, 6);
        let productosHTML = `
          <h2>Productos</h2>
          <div class="productos-contenedor">
        `;

        const preciosPredefinidos = [1200, 1800, 4900, 4500, 2700, 3700];

        productos.forEach((producto, index) => {
          const imagen = producto.image_url || 'ruta/a/imagen/por/defecto.jpg'; // Asegúrate de manejar imágenes no disponibles
          const alt = producto.product_name || 'Imagen de producto';
          const nombre = producto.product_name || 'Producto sin nombre';
          const descripcion = producto.generic_name || 'Descripción no disponible';
          const precio = preciosPredefinidos[index] || 1000;

          productosHTML += `
            <div class="producto">
              <img src="${imagen}" alt="${alt}">
              <h3>${nombre}</h3>
              <p class="descripcion">${descripcion}</p>
              <div class="footer">
                <p class="precio">Precio: $${precio.toFixed(2)}</p>
                <a href="#" class="btn btn-card" data-index="${index}">Agregar al carrito</a>
              </div>
            </div>
          `;
        });

        productosHTML += `</div>`;
        const productosElement = document.getElementById("productos");
        if (productosElement) {
          productosElement.innerHTML = productosHTML;
        } else {
          console.error("El elemento 'productos' no existe en el DOM.");
        }

        // Manejo de eventos para los botones
        let productosButtons = document.querySelectorAll("#productos .btn.btn-card");
        productosButtons.forEach(button => {
          button.addEventListener("click", (event) => {
            event.preventDefault();
            let index = event.target.getAttribute("data-index");
            agregarAlCarrito(productos[index]); 
          });
        });

        actualizarNumeroCarrito();
      } else {
        console.log("No se encontraron productos.");
      }
    })
    .catch(error => console.error('Error al obtener los datos de la API:', error));

  // Inicializa el contador al cargar la página
  crearTarjetasProductosCarrito();
  actualizarNumeroCarrito();
});

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("productos")) {
    fetch(
      "https://world.openfoodfacts.org/cgi/search.pl?search_terms=snack&json=true&lc=es"
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        if (data.products && data.products.length > 0) {
          const productos = data.products.slice(1, 7).map((producto) => ({
            id: producto._id,
            image_url: producto.image_url,
            product_name: producto.product_name,
            generic_name: producto.generic_name || "Descripción no disponible",
          }));
          console.log(productos);

          let productosHTML = `
          <h2>Productos</h2>
          <div class="productos-contenedor">
        `;

          const preciosPredefinidos = [1200, 1800, 4900, 4500, 2700, 3700];

          productos.forEach((producto, index) => {
            const imagen = producto.image_url;
            const alt = producto.product_name || "Imagen de producto";
            const nombre = producto.product_name;
            const descripcion =
              producto.generic_name || "Descripción no disponible";
            const precio = preciosPredefinidos[index] || 1000;
            producto.precio = precio;

            productosHTML += `
            <div class="producto">
              <img src="${imagen}" alt="${alt}">
              <h3>${nombre}</h3>
              <p class="descripcion">${descripcion}</p>
              <div class="footer">
                <p class="precio">$${precio.toFixed(2)}</p>
                <button class="btn btn-card" data-index="${index}">Agregar al carrito</button>
              </div>
            </div>
          `;
          });

          productosHTML += `</div>`;
          const productosElement = document.getElementById("productos");

          productosElement.innerHTML = productosHTML;

          // console.log(productosElement);

          // Agregar los event listeners para los botones "Agregar al carrito" en cada producto
          let productosButtons = document.querySelectorAll(
            "#productos .btn.btn-card"
          );
          productosButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
              // console.log(event.target);

              let index = event.target.getAttribute("data-index");
              // console.log(index);

              agregarAlCarrito(productos[index]);
            });
          });

          // actualizarNumeroCarrito();
        } else {
          console.log("No se encontraron productos.");
        }
      })
      .catch((error) =>
        console.error("Error al obtener los datos de la API:", error)
      );
  }

  // Función para manejar la lógica de agregar productos al carrito y almacenarlos en localStorage
  function agregarAlCarrito(producto) {
    // Obtener los datos actuales del carrito almacenados en localStorage con clave seleccionados
    const memoria = localStorage.getItem("seleccionados");

    if (!memoria) {
      // Si no hay datos en localStorage, agregar el primer producto con cantidad 1
      const nuevoProducto = { ...producto, cantidad: 1 };
      localStorage.setItem("seleccionados", JSON.stringify([nuevoProducto]));
    } else {
      // Si ya hay datos, parsear el JSON para obtener un array de productos
      const productosEnCarrito = JSON.parse(memoria);
      // Verificar si el producto ya está en el carrito
      const productoExistente = productosEnCarrito.find(
        (p) => p.id === producto.id
      );

      if (productoExistente) {
        // Si el producto ya existe en el carrito, incrementar la cantidad
        productoExistente.cantidad++;
      } else {
        // Si el producto no existe en el carrito, agregarlo con cantidad 1
        const nuevoProducto = { ...producto, cantidad: 1 };
        productosEnCarrito.push(nuevoProducto);
      }

      // Guardar nuevamente el array actualizado en localStorage
      localStorage.setItem("seleccionados", JSON.stringify(productosEnCarrito));
    }

    actualizarNumeroCarrito();
  }

   // Actualizar el contador al cargar la página
  actualizarNumeroCarrito();
});

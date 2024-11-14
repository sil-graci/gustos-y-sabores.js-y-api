const contenedorResenias = document.querySelector(".resenias");
const botonCargarMas = document.querySelector("#button-resenia");

document.addEventListener("DOMContentLoaded", () => {
    let frasesPersonalizadas = [
        "¡Los tentempiés son deliciosos! Me encantó la variedad y la calidad.", 
        "Una excelente opción para un snack saludable. ¡Volveré a comprar!",
        "Los productos son de alta calidad y se nota. Muy satisfecho.",
        "Me sorprendió la frescura de los productos, ¡sin duda los volveré a comprar!",
        "¡Qué rico! Los tentempiés son de excelente calidad, los probé todos y me encantaron.",
        "Cada bocado es un placer. Muy satisfecho con la variedad y el sabor.",
        "¡Todo riquísimo! Los tentempiés son perfectos para acompañar cualquier momento.",
        "Gran calidad en cada producto. ¡Se nota que están hechos con ingredientes frescos!",
        "Me encantaron los productos. Son perfectos para esos momentos en los que necesito algo rápido y sabroso."
    ];

    let fechasAleatorias = [
        "02 de octubre de 2024",
        "15 de septiembre de 2024",
        "25 de agosto de 2024",
        "10 de noviembre de 2024",
        "03 de diciembre de 2024",
        "18 de julio de 2024",
        "22 de marzo de 2024",
        "07 de mayo de 2024",
        "19 de febrero de 2024"

    ];
    let resultadoActual = 0;

    // Cargar las primeras tres reseñas
    cargarLoteResenias();

    // Evento para el botón
    botonCargarMas.addEventListener("click", cargarLoteResenias);

    // Función para cargar un lote de tres reseñas
    function cargarLoteResenias() {
        contenedorResenias.innerHTML = "";
        for (let i = 0; i < 3; i++) {
            let indiceActual = (resultadoActual + i) % frasesPersonalizadas.length;  // Calculamos el índice para esta iteración
            traerDatosAPI(indiceActual);
        }
        // Actualizamos resultadoActual para el siguiente lote
        resultadoActual = (resultadoActual + 3) % frasesPersonalizadas.length;
    }



    function traerDatosAPI(indice) {  
        fetch("https://randomuser.me/api")
            .then((datos) => datos.json())
            .then(datos => {
                let fraseAleatoria = frasesPersonalizadas[indice];
                let fechaAleatoria = fechasAleatorias[indice];
                let calificacion = Math.random() < 0.5 ? "⭐⭐⭐⭐" : "⭐⭐⭐⭐⭐";
                
                contenedorResenias.innerHTML += `
                    <div class="card">
                        <img src="${datos.results[0].picture.large}" alt="Foto de usuario">
                        <h3>${datos.results[0].name.last}, ${datos.results[0].name.first}</h3>
                        <div class="calificacion">${calificacion}</div>
                        <p>${fraseAleatoria}</p>
                        <span class="fecha">${fechaAleatoria}</span>
                    </div>`;
            })
            .catch(error => console.error("Error al obtener los datos:", error));
    }
});



const contenedorResenias = document.querySelector(".resenias");

document.addEventListener("DOMContentLoaded", () => {
    let frasesPersonalizadas = [
        "¡Los tentempiés son deliciosos! Me encantó la variedad y la calidad.", 
        "Una excelente opción para un snack saludable. ¡Volveré a comprar!",
        "Los productos son de alta calidad y se nota. Muy satisfecho."
    ];
    let fechasAleatorias = [
        "02 de octubre de 2024",
        "15 de septiembre de 2024",
        "25 de agosto de 2024"
    ];
    let resultadoActual = 0;

    for (let i = 0; i < 3; i++) {
        traerDatosAPI();
    }

    function traerDatosAPI() {  
        fetch("https://randomuser.me/api")
            .then((datos) => datos.json())
            .then(datos => {
                let fraseAleatoria = frasesPersonalizadas[resultadoActual];
                let fechaAleatoria = fechasAleatorias[resultadoActual];
                let calificacion = Math.random() < 0.5 ? "⭐⭐⭐⭐" : "⭐⭐⭐⭐⭐";
                
                contenedorResenias.innerHTML += `
                    <div class="card">
                        <img src="${datos.results[0].picture.large}" alt="Foto de usuario">
                        <h3>${datos.results[0].name.last}, ${datos.results[0].name.first}</h3>
                        <div class="calificacion">${calificacion}</div>
                        <p>${fraseAleatoria}</p>
                        <span class="fecha">${fechaAleatoria}</span>
                    </div>`;
                
                resultadoActual = (resultadoActual + 1) % frasesPersonalizadas.length;
            })
            .catch(error => console.error("Error al obtener los datos:", error));
    }
});


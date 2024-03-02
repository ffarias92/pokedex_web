// Función para mostrar el resultado de la búsqueda
function mostrarResultado(data) {
    var resultadoDiv = document.getElementById("resultado");
    // Convertir la primera letra del nombre a mayúscula
    var primerLetraMayuscula = data.nombre.charAt(0).toUpperCase();
    resultadoDiv.innerHTML = `
        <div class="info-box">
        <p>Has ingresado los datos del Pokémon ${primerLetraMayuscula}${data.nombre.slice(1).toLowerCase()}</p>
            ${data.sprite ? `<img src="${data.sprite}" alt="${data.nombre}" class="sprite">` : ''}
        </div>
        <div class="info-box">
            <p>Los tipos de ${primerLetraMayuscula}${data.nombre.slice(1).toLowerCase()} son: ${data.tipos.join(', ')}</p>
        </div>
        <div class="info-box">
            <p>${primerLetraMayuscula}${data.nombre.slice(1).toLowerCase()} pesa: ${data.peso} kg</p>
        </div>
        <div class="info-box">
            <p>${primerLetraMayuscula}${data.nombre.slice(1).toLowerCase()} posee las siguientes habilidades: ${data.habilidades.join(', ')}</p>
        </div>
    `;
}



// Función para mostrar un mensaje de error en caso de no encontrar el Pokémon
function mostrarResultadoError() {
    var resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "<p id='error-message'>No se encontró el Pokémon. Inténtalo de nuevo.</p>";
}

// Función para buscar un Pokémon
function buscarPokemon() {
    var nombrePokemon = document.getElementById("pokemonInput").value;
    fetch('/buscar_pokemon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombrePokemon
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontró el Pokémon.');
            }
            return response.json();
        })
        .then(data => {
            mostrarResultado(data);
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarResultadoError();
        });
}

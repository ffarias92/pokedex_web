from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)


def extraer_habilidades(datos):
    habilidades = [habilidad['ability']['name']
                   for habilidad in datos['abilities']]
    return habilidades


def extraer_tipos(datos):
    tipos = [tipo['type']['name'] for tipo in datos['types']]
    return tipos


def extraer_peso(datos):
    peso = datos['weight'] / 10  # Convertir de hectogramos a kilogramos
    return peso


def obtener_sprite(datos):
    return datos['sprites']['front_default']


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/buscar_pokemon', methods=['POST'])
def buscar_pokemon():
    nombre_pokemon = request.json['nombre']
    nombre_formateado = nombre_pokemon.title()  # Solo la primera letra en mayúscula
    url = f"https://pokeapi.co/api/v2/pokemon/{nombre_pokemon.lower()}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return jsonify({
            'nombre': nombre_formateado,
            'tipos': extraer_tipos(data),
            'peso': extraer_peso(data),
            'habilidades': extraer_habilidades(data),
            'sprite': obtener_sprite(data)  # Agregar la URL del sprite
        })
    else:
        return jsonify({'error': 'No se encontró el Pokémon.'}), 404


if __name__ == '__main__':
    app.run(debug=True)

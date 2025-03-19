from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

# Conexión a MongoDB
client = MongoClient("mongodb://localhost:27017/test")

db = client.text_database  # Nombre de la base de datos
text_collection = db.texts  # Nombre de la colección

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

# Ruta para enviar texto
@app.route('/send', methods=['POST'])
def send_text():
    data = request.get_json()
    if not data or 'texto' not in data or not data['texto'].strip():
        return jsonify({"error": "Texto requerido"}), 400
    text_collection.insert_one({"texto": data['texto']})
    return jsonify({"message": "Texto guardado"}), 201

# Ruta para obtener textos
@app.route('/textos', methods=['GET'])
def get_texts():
    texts = list(text_collection.find({}, {"_id": 0, "texto": 1}))
    return jsonify(texts)

if __name__ == '__main__':
    app.run(port=3000, debug=True)

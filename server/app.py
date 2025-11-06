from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Example Model
class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)
    email = db.Column(db.String(120), unique=True)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/app", methods=["POST"])
def hello():
    data = request.get_json()
    return {"hello": data["name"]}

@app.route("/patients", methods=["GET"])
def get_patients():
    patients = Patient.query.all()
    return jsonify([{"id": p.id, "name": p.name, "age": p.age, "email": p.email} for p in patients])

@app.route("/patients", methods=["POST"])
def create_patient():
    data = request.get_json()
    patient = Patient(name=data['name'], age=data.get('age'), email=data.get('email'))
    db.session.add(patient)
    db.session.commit()
    return jsonify({"id": patient.id}), 201

# Initialize database
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
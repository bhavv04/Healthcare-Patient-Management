import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
from dotenv import load_dotenv

# --- We removed SQLAlchemy ---
# --- We added os, supabase-py, and dotenv ---

app = Flask(__name__)
CORS(app) # CORS is still needed, good call!

# Load .env file for Supabase keys
load_dotenv()

# --- Removed SQLite Config ---

# 1. Initialize Supabase client
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_KEY") # Use the SERVICE key
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# --- Removed the SQLAlchemy Patient Model ---
# (Your 'patients' table is in the Supabase dashboard)


# 2. Add the Auth verification helper
def get_user_from_token():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return None, "Missing Authorization header"
    
    try:
        token = auth_header.split(' ')[1] 
    except:
        return None, "Invalid Authorization header"

    try:
        # Verify the token with Supabase
        user_response = supabase.auth.get_user(token)
        return user_response.user, None
    except Exception as e:
        return None, f"Invalid token: {str(e)}"

# --- Your original routes, but modified for Supabase ---

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/app", methods=["POST"])
def hello():
    data = request.get_json()
    return {"hello": data["name"]}

@app.route("/patients", methods=["GET"])
def get_patients():
    # 1. Protect the route
    user, error_msg = get_user_from_token()
    if not user:
        return jsonify({"error": error_msg}), 401
    
    # 2. Query Supabase instead of SQLAlchemy
    response = supabase.table('patients').select('*').execute()
    
    # 3. Return the data
    return jsonify(response.data)

@app.route("/patients", methods=["POST"])
def create_patient():
    # 1. Protect the route
    user, error_msg = get_user_from_token()
    if not user:
        return jsonify({"error": error_msg}), 401

    # 2. Get data (your code was perfect)
    data = request.get_json()
    if 'name' not in data:
         return jsonify({"error": "Patient name is required"}), 400

    try:
        # 3. Insert into Supabase table
        insert_response = supabase.table('patients').insert({
            "full_name": data['name'],
            # You can add more fields from your model here
            # "age": data.get('age'), 
            # "email": data.get('email')
        }).execute()
        
        new_patient = insert_response.data[0]
        
        # 4. Return the new patient ID
        return jsonify({"id": new_patient.get('id')}), 201

    except Exception as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

# --- Removed db.create_all() ---

if __name__ == '__main__':
    app.run(debug=True, port=5000) # Using port 5000
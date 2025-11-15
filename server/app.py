import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client  # type: ignore  # pylint: disable=import-error
from dotenv import load_dotenv

app = Flask(__name__)
# Allow all origins from your React app's port
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Load .env file for Supabase keys
load_dotenv()

# 1. Initialize Supabase client
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_KEY") # Use the SERVICE key
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

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

# --- YOUR EXISTING ROUTES ---

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
    
    response = supabase.table('patients').select('*').execute()
    
    return jsonify(response.data)

@app.route("/patients", methods=["POST"])
def create_patient():
    # 1. Protect the route
    user, error_msg = get_user_from_token()
    if not user:
        return jsonify({"error": error_msg}), 401

    # 2. Get data
    data = request.get_json()
    if 'name' not in data:
         return jsonify({"error": "Patient name is required"}), 400

    try:
        # 3. Insert into Supabase table
        insert_response = supabase.table('patients').insert({
            "full_name": data['name'],
        }).execute()
        
        new_patient = insert_response.data[0]
        
        # 4. Return the new patient ID
        return jsonify({"id": new_patient.get('id')}), 201

    except Exception as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

# --- ADD THIS NEW SECTION ---

@app.route("/patients/<patient_id>", methods=["PUT"])
def update_patient(patient_id):
    """
    Updates a specific patient's name.
    Expects JSON: { "name": "New Name" }
    """
    # 1. Protect the route
    user, error_msg = get_user_from_token()
    if not user:
        return jsonify({"error": error_msg}), 401
    
    # 2. Get the new data
    data = request.get_json()
    new_name = data.get('name')
    if not new_name:
         return jsonify({"error": "New patient name is required"}), 400

    try:
        # 3. Update the patient in Supabase
        update_response = supabase.table('patients').update({
            "full_name": new_name
        }).eq('id', patient_id).execute()
        
        if not update_response.data:
            return jsonify({"error": "Patient not found"}), 404
            
        return jsonify(update_response.data[0]), 200
    except Exception as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

@app.route("/patients/<patient_id>", methods=["DELETE"])
def delete_patient(patient_id):
    """
    Deletes a specific patient.
    """
    # 1. Protect the route
    user, error_msg = get_user_from_token()
    if not user:
        return jsonify({"error": error_msg}), 401

    try:
        # 2. Delete the patient from Supabase
        delete_response = supabase.table('patients').delete().eq('id', patient_id).execute()
        
        if not delete_response.data:
            return jsonify({"error": "Patient not found"}), 404
            
        # 3. Return a success message
        return jsonify({"message": f"Patient {patient_id} deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

# --- END OF NEW SECTION ---

if __name__ == '__main__':
    app.run(debug=True, port=5000) # Using port 5000
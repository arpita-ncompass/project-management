from flask import request, jsonify
from app import app
from user.user_model import UserModel

user_model = UserModel()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']

    exsisting_user = user_model.get_user_by_email(email)
    if exsisting_user:
        return jsonify({'error': 'User already exists with this email'}), 400
    
    user_id = user_model.create_user(name, email, password)
    return jsonify({'message': 'User created successfully', 'user_id': user_id}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    token = user_model.login_user(email, password)
    if token:
        return jsonify({'token': token}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401
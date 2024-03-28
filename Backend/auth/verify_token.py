import jwt
from functools import wraps
from flask import request, jsonify

def verify_token(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        token = request.headers['Authorization']
        # token = t.split(' ')[1]
        if not token:
            return jsonify({'error': "token not found"})
        
        try:
            decoded_token = jwt.decode(token, 'mysecretkey', algorithms=["HS256"])
            print(decoded_token)
            kwargs['user_id']= decoded_token['user_id']
            kwargs['email']= decoded_token['email']
            return func(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': "Invalid token"})
        
    return decorated_function
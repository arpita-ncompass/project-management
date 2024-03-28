import os
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import hashlib
import jwt
# from app import client

load_dotenv()

def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()

class UserModel:
    def __init__(self):
        client =os.getenv('MONGO_URI')
        database_name = 'MongoDb_Usecase'
        self.client = MongoClient(client)
        self.db = self.client[database_name]
        self.collection = self.db.Users

    def create_user(self, name, email, password):
        user_data = {
            'name': name,
            "email": email,
            'password': hash_password(password)
        }
        result = self.collection.insert_one(user_data)
        return str(result.inserted_id)
    
    def get_user_by_email(self, email):
        return self.collection.find_one({'email': email})
    
    def login_user(self, email, password):
        user = self.collection.find_one({'email': email})
        if user['password'] == hash_password(password):
            token = self.generate_token(user['_id'], email)
            return token
        return 'Could not login user'
            
    
    def generate_token(self, user_id, email):
        payload = {
            'user_id': str(user_id),
            'email': email
        }
        token = jwt.encode(payload, 'mysecretkey', algorithm='HS256')
        return token
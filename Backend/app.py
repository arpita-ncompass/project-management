from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from flask_cors import CORS
load_dotenv()
app = Flask(__name__)
CORS(app ,origins='http://localhost:3000')
client = MongoClient(os.getenv('MONGO_URI'))
try:
    print(client.list_database_names())
except Exception as e:
    print("Error:", e)

if __name__ == "__main__":
    app.run(debug=True)

from user.user_controller import *
from project.project_controller import *
from tasks.task_controller import *










import json
from pymongo import MongoClient
from auth.verify_token import verify_token
import random
from user.user_model import UserModel
from bson import json_util
import hashlib

from project.email_conn import Credentials

cred = Credentials()

class ProjectModel:
    def __init__(self):
        client =os.getenv('MONGO_URI')
        database_name = 'MongoDb_Usecase'
        self.client = MongoClient(client)
        self.db = self.client[database_name]
        self.collection = self.db.Projects
        self.user_model = UserModel()

    # @verify_token
    def create_project(self,project_name, project_description, email):
        project = {
            'title': project_name,
            'description': project_description,
            'owner': email,
            'members': []
        }
        self.collection.insert_one(project)
        project_details = self.collection.find_one(project)
        return {'message': json.loads(json_util.dumps(project_details))}
    
    # @verify_token
    def add_member(self, title, member_email, role):
        project = self.collection.find_one({'title':title})
        if project:
            user = self.user_model.collection.find_one({'email': member_email})
            print(user)
            if user:
                user_details = {
                    'email': member_email,
                    'role': role
                }
                self.collection.update_one({'title':title}, {'$push': {'members': user_details}})
                return {'message': "Member added to project"}
            else:
                password_hash = ''.join(random.choice('0123456789') for _ in range(6))

                user_details = {
                    'name': member_email.split('@')[0],
                    'email': member_email,
                    'password': hashlib.md5(password_hash.encode()).hexdigest()
                }
                self.user_model.collection.insert_one(user_details)
                self.collection.update_one({'title': title}, {'$push': {'members': user_details}})
                cred.send_credentials(user_details['email'], user_details['password'])
                return {'message': 'New member added to project'}
        else:
            return {'error': 'Project not found'}  
    

    def get_projects_for_user(self, email):
        projects = self.collection.find({'$or': [{'owner': email}, {'members': email}]})
        p = json.loads(json_util.dumps(projects))
        return p       
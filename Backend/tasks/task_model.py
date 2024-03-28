import json
from pymongo import MongoClient
from project.project_model import ProjectModel
from bson import json_util
import os

class TasksModel:
    def __init__(self):
        client =os.getenv('MONGO_URI')
        database_name = 'MongoDb_Usecase'
        self.client = MongoClient(client)
        self.db = self.client[database_name]
        self.collection = self.db.Tasks
        self.project_model = ProjectModel()

    def create_tasks(self, task_title, task_description, project_id):
        project = self.project_model.collection.find_one({'_id': project_id})
        print(project)
        if project:
            task = {
                'title': task_title,
                'description': task_description,
                'project_id': project_id
            }
            result = self.collection.insert_one(task)
            if result.inserted_id:
                return {'message': 'Task created successfully', 'task_id': str(result.inserted_id)}
            else:
                return {'error': 'Failed to create task'}, 500
        else:
            return {'error': 'Project not found with the given ID'}, 404
        
    def get_tasks_by_project(self, project_id):
        tasks = self.collection.find({'project_id': project_id})
        result = json.loads(json_util.dumps(list(tasks)))
        print(result)
        return result


    
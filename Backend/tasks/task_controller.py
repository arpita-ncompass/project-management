from flask import request, jsonify
from app import app
from tasks.task_model import TasksModel
from bson import ObjectId

tasks_model = TasksModel()

@app.route('/create-task', methods=['POST'])
def create_task():
    data = request.get_json()
    task_title = data['title']
    task_description = data['description']
    project_id = ObjectId(data['project_id']) 
    result = tasks_model.create_tasks(task_title, task_description, project_id)
    return jsonify(result), 200

@app.route('/get-all-tasks', methods=['GET'])
def get_tasks_for_project():
    project_id_str = request.args.get('project_id')

    if project_id_str:
        project_id = ObjectId(project_id_str)
        result = tasks_model.get_tasks_by_project(project_id)
        return jsonify({'tasks': result}), 200
    else:
        return jsonify({'error': 'Could not fetch tasks'}), 400






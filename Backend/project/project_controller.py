from flask import request, jsonify
from app import app
from project.project_model import ProjectModel
from auth.verify_token import verify_token

project_model = ProjectModel()

@app.route('/create-project', methods=['POST'])
@verify_token
def create_project(user_id, email):
    data = request.get_json()
    project_name = data['project_name']
    project_description = data['project_description']
    result = project_model.create_project(project_name, project_description, email)
    return jsonify(result), 200

@app.route('/add-members', methods=['POST'])
@verify_token
def add_member_to_project(user_id,email):
    if user_id:
        data = request.get_json()
        project_title = data['project_title']
        member_email = data['member_email']
        role= data['member_role']
        result = project_model.add_member(project_title, member_email, role)
        return jsonify(result), 200
    
@app.route('/get-all-products', methods=['GET'])
@verify_token
def get_all_projects(user_id, email):
    projects = project_model.get_projects_for_user(email)
    if projects:
        return jsonify({'projects': projects}), 200
    else:
        return jsonify({'message': 'No projects found'}), 400

   

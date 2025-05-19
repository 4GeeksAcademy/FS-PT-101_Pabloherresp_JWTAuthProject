"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/signup', methods=['POST', 'GET'])
def signup():
    data = request.json
    print(data)
    if not data or "email" not in data or "password" not in data:
        return jsonify({"error":"Missing fields"}), 400
    encrypted_pass = generate_password_hash(data["password"])
    user = Users(email=data["email"], password=encrypted_pass, is_active=True)
    db.session.add(user)
    try:
        db.session.commit()
    except IntegrityError:
        return jsonify({"error":"User already created"}), 401
    except Exception:
        return jsonify({"error":"Unknown error"}), 400

    response_body = {
        "success": True
    }
    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data or "email" not in data or "password" not in data:
        return jsonify({"error":"Missing fields"}), 400
    stmt = select(Users).where(Users.email == data["email"])
    user = db.session.execute(stmt).scalar_one_or_none()
    if not user:
        return jsonify({"error":"User not found"}), 404
    if not check_password_hash(user.password, data["password"]):
        return jsonify({"error":"Email/Password don't match"}), 401
    token = create_access_token(identity=str(user.id))
    response_body = {
        "success": True,
        "token": token
    }
    return jsonify(response_body), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def getUsers():
    stmt = select(Users)
    users = db.session.execute(stmt).scalars()
    if not users:
        return jsonify({"error": "No users yet"}), 404
    else:
        response = [i.serialize() for i in users]
        return response, 200
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import random

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost/Album_Blogs?charset=utf8&use_unicode=0'
# Zamena na: root so DB username, password so DB user password, localhsot so db host.

CORS(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)

static_path = "/usr/share/nginx/html/albums" # Root directory na static file server

def customAbort(code, message):
    return jsonify({
        "code": code,
        "message": message
    }), code

def get_random_alphanumerical(_len = 16):
    asciiCodes = []
    alphanumerical = ""
    asciiCodes += random.sample(range(97, 122), int(round(0.375 * _len)))
    asciiCodes += random.sample(range(65, 90), int(round(0.375 * _len)))
    asciiCodes += random.sample(range(48, 57), int(round(0.25 * _len)))
    random.shuffle(asciiCodes)
    for char in asciiCodes:
        alphanumerical += chr(char)
    return alphanumerical

def get_extension(_f):
    ext = str(_f.filename.split(".")[len(_f.filename.split(".")) - 1])
    if ext == "blob":
        return "jpg"
    else:
        return ext

def createRoute(request, obj):
    if request.method == "GET":
        return obj.read(request)
    if request.method == "POST":
        return obj.create(request)
    if request.method == "PUT":
        return obj.update(request)
    if request.method == "DELETE":
        return obj.delete(request)
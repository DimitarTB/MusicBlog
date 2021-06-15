from flask import jsonify, request

from setup import app, customAbort, createRoute
from Routes.User import UserClass
from Routes.Data import get_data
from Routes.Albums import AlbumsClass, TracksClass, TracksContentClass


# ========== Users Routes ========== #
user = UserClass()

@app.route("/api/user/login", methods=["POST"])
def _login():
    return user.login(request)

@app.route("/api/user/register", methods=["POST"])
def _register():
    return user.register(request)

@app.route("/api/user/update", methods=["PUT"])
def _edit_profile():
    return user.edit_profile(request)

@app.route("/api/user/get", methods=["GET"])
def _get_users():
    return user.get_users(request)

# ========== Users Routes ========== #


# ========== Data Routes =========== #

@app.route("/api/data", methods=["GET"])
def _get_data():
    return get_data(request)

# ========== Data Routes =========== #


# ========== Albums Routes ========= #

album = AlbumsClass()
track = TracksClass()
content = TracksContentClass()

@app.route("/api/albums", methods=["GET", "POST", "PUT", "DELETE"])
def _albums():
    return createRoute(request, album)

@app.route("/api/tracks", methods=["GET", "POST", "PUT", "DELETE"])
def _track():
    return createRoute(request, track)

@app.route("/api/content", methods=["GET", "POST", "PUT", "DELETE"])
def _content():
    return createRoute(request, content)

# ========== Albums Routes ========= #

if __name__ == "__main__":
    app.run()
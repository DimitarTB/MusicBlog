from Models import Users, Users_Schema, db
from setup import customAbort
from flask import jsonify

class UserClass:
    def __init__(self):
        pass

    def register(self, request):
        # REQUIRED _email IN POST FORM
        # REQUIRED _username IN POST FORM
        # REQUIRED _password IN POST FORM
        # REQUIRED _type_id IN POST FORM
        user = Users.query.filter_by(_email=request.form["_email"]).first()
        if user is not None: 
            return customAbort(409, "This email is already in use.")

        user = Users.query.filter_by(_username=request.form["_username"]).first()
        if user is not None: 
            return customAbort(409, "This username is taken.")

        new_user = Users(
            _email = request.form["_email"],
            _username = request.form["_username"],
            _password = request.form["_password"],
            _type_id = request.form["_type_id"]
        )
        db.session.add(new_user)
        db.session.commit()

        users_schema = Users_Schema()
        user = Users.query.filter_by(_email=request.form["_email"]).first()

        return jsonify({
            "user" : users_schema.dump(user)
        })

    def login(self, request):
        # REQUIRED _username IN POST FORM
        # REQUIRED _password IN POST FORM
        if "_username" not in request.form or "_password" not in request.form:
            return customAbort(403, "Incorrect username or password.")
        
        user = Users.query.filter_by(_username=request.form["_username"], _password=request.form["_password"]).first()

        if user is None: 
            return customAbort(403, "Incorrect username or password.")

        users_schema = Users_Schema()

        return jsonify({
            "user" : users_schema.dump(user)
        })

    def get_users(self, request):
        # OPTIONAL _id IN GET
        if "_id" in request.args:
            user = Users.query.filter_by(_id=request.args["_id"]).with_entities(Users._id, Users._username, Users._validated, Users._type_id).first()
            users_schema = Users_Schema()
            return jsonify({
                "user" : users_schema.dump(user)
            })
        else:    
            users = Users.query.with_entities(Users._id, Users._username, Users._validated, Users._type_id).all()
            users_schema = Users_Schema(many=True)
            return jsonify({
                "users" : users_schema.dump(users)
            })
    
    def edit_profile(self, request):
        # REQUIRED _id IN POST FORM
        # REQUIRED _password IN POST FORM
        if "_id" not in request.form:
            return customAbort(404, "Requested user does not exist.")
        
        user = Users.query.filter_by(_id=request.form["_id"]).first()
        
        if user is None:
            return customAbort(404, "Requested user does not exist.")

        users_schema = Users_Schema()
        user_obj = users_schema.dump(user)
        if "_password" not in request.form or user_obj["_password"] != request.form["_password"]:
            return customAbort(403, "Incorrect password.")
        
        if "_new_username" in request.form:
            _user = Users.query.filter_by(_username = request.form["_new_username"]).first()
            if _user is not None:
                return customAbort(409, "Username is taken.")
            user._username = request.form["_new_username"]
        
        if "_new_email" in request.form:
            _user = Users.query.filter_by(_email = request.form["_new_email"]).first()
            if _user is not None:
                return customAbort(409, "Email is already in use.")
            user._email = request.form["_new_email"]

        if "_new_password" in request.form:
            user._password = request.form["_new_password"]
        
        db.session.commit()
        output = Users.query.filter_by(_id=request.form["_id"]).with_entities(Users._id, Users._username, Users._validated, Users._type_id).first()

        return jsonify({
            "user" : users_schema.dump(output)
        })
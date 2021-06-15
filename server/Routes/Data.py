from Models import User_Types, User_Types_Schema, Themes, Themes_Schema, Content_Types, Content_Types_Schema, db
from setup import customAbort
from flask import jsonify

def get_data(request):
    user_types_schema = User_Types_Schema(many=True)
    themes_schema = Themes_Schema(many=True)
    content_types_scheme = Content_Types_Schema(many=True)


    user_types = User_Types.query.all()
    themes = Themes.query.all()
    content_types = Content_Types.query.all()

    return jsonify({
        "user_types" : user_types_schema.dump(user_types),
        "themes" : themes_schema.dump(themes),
        "content_types" : content_types_scheme.dump(content_types),
    })
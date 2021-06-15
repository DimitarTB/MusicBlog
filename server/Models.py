from setup import db, ma
from sqlalchemy.inspection import inspect

class User_Types(db.Model):
    tablename="User_Types"
    __table_args__ = {'extend_existing': True}
    _id = db.Column(db.Integer, primary_key=True)
    _name = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return '<User_Types %r>' % self._name

class User_Types_Schema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User_Types

class Users(db.Model):
    tablename="Users"
    __table_args__ = {'extend_existing': True}
    _id = db.Column(db.Integer, primary_key = True, nullable = False)
    _email = db.Column(db.String(128), nullable = False)
    _password = db.Column(db.String(256), nullable = False)
    _username = db.Column(db.String(100), nullable = False)
    _validated = db.Column(db.Integer, default = 0, nullable = False)
    _type_id = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Users %r>' % self.title

class Users_Schema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Users

class Themes(db.Model):
    tablename="Themes"
    __table_args__ = {'extend_existing': True}
    _id = db.Column(db.Integer, primary_key = True, nullable = False)
    _name = db.Column(db.String(512), nullable = False)
    _primary = db.Column(db.String(7), nullable = False)
    _secondary = db.Column(db.String(7), nullable = False)
    _accent = db.Column(db.String(7), nullable = False)
    _is_default = db.Column(db.Integer, default = 0)

    def __repr__(self):
        return '<Themes %r>' % self._id

class Themes_Schema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Themes

class Albums(db.Model):
    tablename="Albums"
    __table_args__ = {'extend_existing': True}
    _id = db.Column(db.Integer, primary_key = True, nullable = False)
    _name = db.Column(db.String(256), nullable = False)
    _description = db.Column(db.String(1024), nullable = False)
    _date_created = db.Column(db.DateTime, nullable = False)
    _created_by_id = db.Column(db.Integer, nullable = False)
    _theme_id = db.Column(db.Integer, nullable = False)
    _thumbnail_path = db.Column(db.String(512), nullable = False)

    def __repr__(self):
        return '<Albums %r>' % self._id

class Albums_Schema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Albums

class Tracks(db.Model):
    tablename="Tracks"
    __table_args__ = {'extend_existing': True}
    _id = db.Column(db.Integer, primary_key = True, nullable = False)
    _name = db.Column(db.String(512), nullable = False)
    _description = db.Column(db.String(1024), nullable = False)
    _thumbnail_path = db.Column(db.String(512), nullable = False)
    _album_id = db.Column(db.Integer, nullable = False)

    def __repr__(self):
        return '<Tracks %r>' % self._id

class Tracks_Schema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tracks

class Content_Types(db.Model):
    tablename="Content_Types"
    __table_args__ = {'extend_existing': True}
    _id = db.Column(db.Integer, primary_key = True, nullable = False)
    _name = db.Column(db.String(128), nullable = False)

    def __repr__(self):
        return '<Content_Types %r>' % self._id

class Content_Types_Schema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Content_Types

class Track_Content(db.Model):
    tablename="Track_Content"
    __table_args__ = {'extend_existing': True}
    _id = db.Column(db.Integer, primary_key = True, nullable = False)
    _type_id = db.Column(db.Integer, nullable = False)
    _track_id = db.Column(db.Integer, nullable = False)
    _content_text = db.Column(db.Text(16384))
    _content_file_path = db.Column(db.String(512))
    _index = db.Column(db.Integer)

    def __repr__(self):
        return '<Track_Content %r>' % self._id

class Track_Content_Schema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Track_Content
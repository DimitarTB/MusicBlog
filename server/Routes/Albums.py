from Models import Albums, Albums_Schema, Themes, Themes_Schema, Tracks, Tracks_Schema, Track_Content, Track_Content_Schema, db
from setup import customAbort, get_random_alphanumerical, get_extension, static_path
from flask import jsonify
import json


class AlbumsClass:
    def __init__(self):
        pass

    def create(self, request):

        if "_name" not in request.form or "_description" not in request.form or "_date_created" not in request.form or "_created_by_id" not in request.form:
            return customAbort(400, "Please make sure to enter all the compulsory data before submitting the form.")

        if "_thumbnail" not in request.files:
            return customAbort(400, "Please attach an image to this album.")
        
        _thumbnail = request.files["_thumbnail"]
        _theme_id = 1
        _new_theme = False
        if "_theme_id" not in request.form:
            if "_primary" not in request.form and "_secondary" not in request.form and "_accent" not in request.form:
                return customAbort(400, "Please select a theme or create your own.")
            else:
                _random = get_random_alphanumerical(8)
                theme = Themes(
                    _name = "Custom Theme" + _random,
                    _primary = request.form["_primary"],
                    _secondary = request.form["_secondary"],
                    _accent = request.form["_accent"],
                    _is_default = 0
                )
                db.session.add(theme)
                db.session.commit()
                _theme = Themes.query.filter_by(_name = "Custom Theme" + _random).first()
                themes_schema = Themes_Schema()
                _new_theme = themes_schema.dump(_theme)
                _theme_id = _new_theme["_id"]
        else:
            _theme_id = request.form["_theme_id"]

        _random = get_random_alphanumerical(8)
        file_path = "/images/album_image_"+_random+"."+get_extension(_thumbnail)
        save_path = static_path + file_path
        _thumbnail.save(save_path)
        
        
        album = Albums(
            _name = request.form["_name"],
            _description = request.form["_description"],
            _date_created = request.form["_date_created"],
            _created_by_id = request.form["_created_by_id"],
            _theme_id = _theme_id,
            _thumbnail_path = file_path
        )
        db.session.add(album)
        db.session.commit()

        _album = Albums.query.filter_by(_thumbnail_path = file_path).first()
        albums_schema = Albums_Schema()

        return jsonify({
            "album" : albums_schema.dump(_album),
            "theme" : _new_theme
        })

    def read(self, request):
        if "_id" in request.args:
            album = Albums.query.filter_by(_id=request.args["_id"]).first()
            if album is None:
                return customAbort(404, "Album not found")
            albums_schema = Albums_Schema()
            return jsonify({
                "album": albums_schema.dump(album)
            })
        else:
            albums = Albums.query.all()
            albums_schema = Albums_Schema(many=True)
            return jsonify({
                "albums": albums_schema.dump(albums)
            })

    def update(self, request):
        pass

    def delete(self, request):
        pass


class TracksClass:
    def __init__(self):
        pass

    def create(self, request):
        if "_name" not in request.form or "_description" not in request.form or "_album_id" not in request.form:
            return customAbort(400, "Please make sure to enter all the compulsory data before submitting the form.")
        
        if "_thumbnail" not in request.files:
            return customAbort(400, "Please attach an image to this album.")
        
        _thumbnail = request.files["_thumbnail"]
        
        _random = get_random_alphanumerical(8)
        file_path = "/images/track_image_"+_random+"."+get_extension(_thumbnail)
        save_path = static_path + file_path
        _thumbnail.save(save_path)

        track = Tracks(
            _name = request.form["_name"],
            _description = request.form["_description"],
            _thumbnail_path = file_path,
            _album_id = request.form["_album_id"]
        )

        db.session.add(track)
        db.session.commit()

        _track = Tracks.query.filter_by(_thumbnail_path = file_path).first()
        tracks_schema = Tracks_Schema()

        return jsonify({
            "track" : tracks_schema.dump(_track)
        })

    def read(self, request):
        if "_id" in request.args:
            track = Tracks.query.filter_by(_id=request.args["_id"]).first()
            if track is None:
                return customAbort(404, "Track not found")
            tracks_schema = Tracks_Schema()
            return jsonify({
                "track": tracks_schema.dump(track)
            })
        elif "_album_id" in request.args:
            tracks = Tracks.query.filter_by(_album_id=request.args["_album_id"]).all()
            tracks_schema = Tracks_Schema(many=True)
            return jsonify({
                "album_tracks": tracks_schema.dump(tracks)
            })
        else:
            tracks = Tracks.query.all()
            tracks_schema = Tracks_Schema(many=True)
            return jsonify({
                "tracks": tracks_schema.dump(tracks)
            })

    def update(self, request):
        pass

    def delete(self, request):
        pass


class TracksContentClass:
    def __init__(self):
        pass

    def create(self, request):
        num_items = len(request.form)
        track_id = None
        i = 0
        while i < num_items:
            key = "item_"+str(i)
            if key in request.form:
                item = json.loads(request.form[key])
                track_id = item["_track_id"]
                file_path = ""
                
                if item["_type_id"] in [3, 4]:
                    file = request.files["file_"+str(i)]
                    _random = get_random_alphanumerical(8)
                    file_path = "/images/track_file_"+_random+"."+get_extension(file)
                    save_path = static_path + file_path
                    file.save(save_path)
                content = Track_Content(
                    _type_id = item["_type_id"],
                    _track_id = item["_track_id"],
                    _content_text = item["_content_text"],
                    _content_file_path = file_path,
                    _index = item["_index"]
                )
                db.session.add(content)
                db.session.commit()
            i = i + 1

        if track_id == None:
            return customAbort(400, "Error occurred. Did you enter all the required data?")

        track_content_schema = Track_Content_Schema(many=True)
        content = Track_Content.query.filter_by(_track_id=track_id).all() 

        return jsonify({
            "content" : track_content_schema.dump(content)
        }) 

    def read(self, request):
        if "_id" in request.args:
            content = Track_Content.query.filter_by(_id=request.args["_id"]).first()
            if content is None:
                return customAbort(404, "Track not found")
            content_schema = Track_Content_Schema()
            return jsonify({
                "_content": content_schema.dump(content)
            })
        elif "_track_id" in request.args:
            content = Track_Content.query.filter_by(_track_id=request.args["_track_id"]).all()
            content_schema = Track_Content_Schema(many=True)
            return jsonify({
                "track_content": content_schema.dump(content)
            })
        else:
            content = Track_Content.query.all()
            content_schema = Track_Content_Schema(many=True)
            return jsonify({
                "content": content_schema.dump(content)
            })

    def update(self, request):
        pass

    def delete(self, request):
        pass
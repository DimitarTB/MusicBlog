import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { getAlbum, getTrack } from "../AlbumsSlice"
import { STATIC_URL } from "../../../../package.json"

import "./Albums.css"
import { getUser } from "../../User/userSlice"
import TrackCard from "./TrackCard"
import { NavLink } from "react-router-dom"

import { FaPlusSquare } from "react-icons/fa"
import { getData } from "../../General/GeneralSlice"

String.prototype.convertToRGB = function(opacity){
    if(this.length != 6){
        throw "Only six-digit hex colors are allowed.";
    }

    var aRgbHex = this.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return `rgba(${aRgb[0]}, ${aRgb[1]}, ${aRgb[2]}, ${opacity})`;
}

const Album = props => {
    const dispatch = useDispatch()
    const album_id = useParams()._id
    const albumReducer = useSelector(state => state.album)
    const userReducer = useSelector(state => state.user)
    const general = useSelector(state => state.general.general)
    const album = albumReducer.albums.find(a => parseInt(a._id) === parseInt(album_id))
    const author = userReducer.allUsers.find(u => parseInt(u._id) === parseInt(album?._created_by_id))
    const theme = general?.themes?.find(t => parseInt(t._id) === parseInt(album._theme_id))
    useEffect(() => {
        dispatch(getAlbum())
        dispatch(getUser())
        dispatch(getTrack())
        dispatch(getData())
    }, [dispatch])

    const tracksJsx = albumReducer.tracks.filter(track => parseInt(track._album_id) === parseInt(album_id)).map(track => <TrackCard theme={theme} track={track} />)
    return (
        <div className="container manage-album" style={{background: theme._secondary.replace("#", "").convertToRGB(1.0)}}>
            <div className="top" style={{backgroundImage: "url('"+STATIC_URL + album?._thumbnail_path+"'"}}>
                <div>
                    <h1 style={{color: theme._accent}}>{album._name}</h1>
                    <pre>
                        {album._description}
                    </pre>
                    <h3 style={{color: theme._accent}}>Uploaded by {author._username}</h3>
                </div>
            </div>
            <div className="bottom">
            {tracksJsx}
            {userReducer.currentUser._id === album._created_by_id ? (
                <NavLink style={{backgroundColor: theme._primary}} className="add-track" to={"/createTrack/"+album_id}>
                    <FaPlusSquare style={{color: theme._accent}} />
                    {/* + */}
                </NavLink>
            ) : null}
            </div>
        </div>
    )
}

export default Album
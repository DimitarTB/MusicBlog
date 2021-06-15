import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { STATIC_URL } from "../../../../package.json"
import "./Albums.css"
const AlbumCard = props => {

    const creator = useSelector(state => state?.user?.allUsers?.find(user => user._id === props.album._created_by_id))

    return (
        <div className="album-card">
            <img alt="Album Thumbnail" src={STATIC_URL + props.album._thumbnail_path} />
            <span>
                <h3><NavLink to={"/album/"+props.album._id}>{props.album._name}</NavLink></h3>
                <p>Uploaded by {creator._username} on {props.album._date_created.substr(0, 10)}</p>
            </span>
        </div>
    )
}

export default AlbumCard
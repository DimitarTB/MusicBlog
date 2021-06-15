import { NavLink } from "react-router-dom"
import { STATIC_URL } from "../../../../package.json"

const TrackCard = props => {

    return (
        <div className="track-card" style={{backgroundColor: props.theme._primary}}>
            <img src={STATIC_URL + props.track._thumbnail_path} />
            <h3><NavLink style={{color: props.theme._accent}} to={"/track/"+props.track._id}>{props.track._name}</NavLink></h3>
        </div>
    )
}

export default TrackCard
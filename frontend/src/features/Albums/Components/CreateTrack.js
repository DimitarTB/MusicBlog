import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Form, {
    select,
    input,
    file
} from "../../../former/Form"
import { Redirect, useParams } from 'react-router-dom'
import { createAlbum, createTrack } from "../AlbumsSlice"
import { getData } from "../../General/GeneralSlice"

const CreateTrack = props => {
    const dispatch = useDispatch()
    const album_id = useParams()._id
    const albumReducer = useSelector(state => state.album)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (albumReducer.createTrackStatus === "idle" || submitted !== true) return
        if (albumReducer.createTrackStatus === "loading") return setInfo({ type: "loading", message: "Please wait while the server is processing your request" })
        if (albumReducer.createTrackStatus === "fulfilled") {
            setRedirect(true)
            setInfo({ type: "success", message: "You have successfully been registered" })
        }
        if (albumReducer.createTrackStatus === "error") return setInfo({ type: "error", message: albumReducer.createTrackError })
    }, [albumReducer, submitted])

    const [track, setTrack] = useState({
        _name: "",
        _description: "",
        _thumbnail: null
    })
    const [redirect, setRedirect] = useState(false)
    const [info, setInfo] = useState({ type: null, message: null })

    return (
        <div className="container create-album">
            {redirect === false ? null : <Redirect to={"/track/" + albumReducer.newTrackId} />}
            <Form
                name="Create Track Form"
                data={track}
                fields={[
                    {
                        name: "_name",
                        label: "Track Name",
                        placeholder: "Please Enter the name of the album",
                        fieldType: input,
                        type: "text",
                    },
                    {
                        name: "_description",
                        label: "Track Description",
                        placeholder: "Please Enter Description",
                        fieldType: input,
                        type: "textarea",
                    },
                    {
                        name: '_thumbnail',
                        label: 'Track Thumbnail',
                        multiple: false,
                        fieldType: file
                    }
                ]}
                buttonText="Create Track"
                info={info}
                handleChange={e => {
                    setTrack({ ...track, [e.target.name]: e.target.value })
                    setInfo({ type: null, message: null })
                }}
                handleSubmit={e => {
                    e.preventDefault()
                    setSubmitted(true)
                    const data = new FormData()
                    data.append("_album_id", album_id)
                    data.append("_name", track._name)
                    data.append("_description", track._description)
                    data.append("_thumbnail", track._thumbnail)
                    dispatch(createTrack(data))
                }}
            />
        </div>
    )
}

export default CreateTrack
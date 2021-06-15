import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Form, {
    select,
    input,
    file
} from "../../../former/Form"
import { Redirect } from 'react-router-dom'
import { createAlbum } from "../AlbumsSlice"
import { getData } from "../../General/GeneralSlice"

const CreateAlbum = props => {
    const dispatch = useDispatch()
    const general = useSelector(state => state.general.general)
    const albumReducer = useSelector(state => state.album)
    const currentUser = useSelector(state => state.user.currentUser)
    const [submitted, setSubmitted] = useState(false)
    useEffect(() => {
        dispatch(getData())
    }, [dispatch])

    useEffect(() => {
        if (albumReducer.createAlbumStatus === "idle" || submitted !== true) return
        if (albumReducer.createAlbumStatus === "loading") return setInfo({ type: "loading", message: "Please wait while the server is processing your request" })
        if (albumReducer.createAlbumStatus === "fulfilled") {
            setRedirect(true)
            setInfo({ type: "success", message: "You have successfully been registered" })
        }
        if (albumReducer.createAlbumStatus === "error") return setInfo({ type: "error", message: albumReducer.createAlbumError })
    }, [albumReducer, submitted])

    const [album, setAlbum] = useState({
        _email: "",
        _description: "",
        _theme: "",
        _thumbnail: null
    })
    const [redirect, setRedirect] = useState(false)
    const [info, setInfo] = useState({ type: null, message: null })

    return (
        <div className="container create-album">
            {redirect === false ? null : <Redirect to={"/album/" + albumReducer.newAlbumId} />}
            <Form
                name="Create Album Form"
                data={album}
                fields={[
                    {
                        name: "_name",
                        label: "Album Name",
                        placeholder: "Please Enter the name of the album",
                        fieldType: input,
                        type: "text",
                    },
                    {
                        name: "_description",
                        label: "Album Description",
                        placeholder: "Please Enter Description",
                        fieldType: input,
                        type: "textarea",
                    },
                    {
                        fieldType: select,
                        name: "_theme_id",
                        label: "Album Theme",
                        options: general.themes,
                        displayField: "_name",
                        valueField: "_id"
                    }, 
                    {
                        name: '_thumbnail',
                        label: 'Album Thumbnail',
                        multiple: false,
                        fieldType: file
                    }
                ]}
                buttonText="Create Album"
                info={info}
                handleChange={e => {
                    setAlbum({ ...album, [e.target.name]: e.target.value })
                    setInfo({ type: null, message: null })
                }}
                handleSubmit={e => {
                    e.preventDefault()
                    // for (const key in album) {
                    //     if (album[key] === "" || album[key] === null) return setInfo({ type: "warning", message: "Please make sure that all fiels are filled in correctly" })
                    // }
                    setSubmitted(true)
                    const data = new FormData()
                    data.append("_name", album._name)
                    data.append("_description", album._description)
                    data.append("_theme_id", album._theme_id)
                    data.append("_thumbnail", album._thumbnail)
                    data.append("_created_by_id", currentUser._id)
                    data.append("_date_created", new Date().toISOString().substr(0, 19))
                    dispatch(createAlbum(data))
                }}
            />
        </div>
    )
}

export default CreateAlbum
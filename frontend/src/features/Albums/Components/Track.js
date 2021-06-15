import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { createContent, getAlbum, getContent, getTrack } from "../AlbumsSlice"
import { STATIC_URL } from "../../../../package.json"

import "./Albums.css"
import { getUser } from "../../User/userSlice"
import { getData } from "../../General/GeneralSlice"
import Text from "./ContentTypes/Text"
import Lyrics from "./ContentTypes/Lyrics"
import Image from "./ContentTypes/Image"
import Audio from "./ContentTypes/Audio"

import {
    IoText,
    GrBlockQuote,
    BsFillImageFill,
    GiSoundWaves
} from 'react-icons/all'


const content_types = [
    { _id: 1, _name: "Text" },
    { _id: 2, _name: "Lyrics" },
    { _id: 3, _name: "Image" },
    { _id: 4, _name: "Audio" }
]


const Track = props => {
    const dispatch = useDispatch()
    const track_id = useParams()._id
    const albumReducer = useSelector(state => state.album)
    const userReducer = useSelector(state => state.user)
    const general = useSelector(state => state.general.general)
    const track = albumReducer.tracks.find(t => parseInt(t._id) === parseInt(track_id))
    const album = albumReducer.albums.find(a => parseInt(a._id) === parseInt(track._album_id))
    const author = userReducer.allUsers.find(u => parseInt(u._id) === parseInt(album._created_by_id))
    const theme = general?.themes?.find(t => parseInt(t._id) === parseInt(album._theme_id))

    useEffect(() => {
        dispatch(getUser())
        dispatch(getTrack())
        dispatch(getAlbum())
        dispatch(getData())
        dispatch(getContent())
    }, [dispatch])


    const [trackContent, setTrackContent] = useState([])


    const addContent = (e, type) => {
        e.preventDefault()
        const obj = {
            _type_id: content_types.find(content => content._name === type)._id,
            _track_id: track_id,
            _content_text: "",
            _content_file_path: ""
        }
        setTrackContent([...trackContent, obj])
    }

    const handleChange = (e, index) => {
        const newCurrent = { ...trackContent[index] }
        if ([1, 2].includes(newCurrent._type_id)) newCurrent._content_text = e.target.value
        else newCurrent.file = e.target.files[0]

        let newContent = [...trackContent]
        newContent[index] = newCurrent
        setTrackContent(newContent)
    }

    const newContentJsx = trackContent.map((cont, index) => (
        cont._type_id === 1 ? <textarea className="content-menagment-text" value={trackContent[index]._content_text} onChange={e => handleChange(e, index)} type="text" /> :
            cont._type_id === 2 ? <textarea className="content-menagment-lyric" value={trackContent[index]._content_text} onChange={e => handleChange(e, index)} type="text" /> :
                cont._type_id === 3 ? <input className="content-menagment-image" onChange={e => handleChange(e, index)} type="file" /> :
                    <input className="content-menagment-audio" onChange={e => handleChange(e, index)} type="file" />
    ))

    const content = albumReducer.content.filter(c => c._track_id === parseInt(track_id)).map(content => {
        if (content._type_id === 1) {
            return <Text data={content._content_text} />
        } else if (content._type_id === 2) {
            return <Lyrics data={content._content_text} />
        } else if (content._type_id === 3) {
            return <Image src={content._content_file_path} />
        } else if (content._type_id === 4) {
            return <Audio src={content._content_file_path} />
        }
    })

    const handleSubmit = e => {
        e.preventDefault()

        const data = new FormData()
        let index = 0
        for (const _item of trackContent) {
            const item = { ..._item }
            if ([1, 2].includes(item._type_id)) {
                data.append("item_" + index, JSON.stringify({ ...item, _index: index }))
            } else {
                const file = item.file
                delete item.file
                data.append("item_" + index, JSON.stringify({ ...item, _index: index }))
                data.append("file_" + index, file)
            }
            index++
        }

        dispatch(createContent(data))

    }

    return (
        <div className="container manage-track" style={{ background: theme._secondary.replace("#", "").convertToRGB(1.0) }}>
            <div className="top" style={{ backgroundImage: "url('" + STATIC_URL + track?._thumbnail_path + "'" }}>
                <div>
                    <h1 style={{ color: theme._accent }}>{track._name}</h1>
                    <pre>
                        {track._description}
                    </pre>
                </div>
            </div>
            <div className="bottom">
                <div className="content-container" style={{color: theme._accent, background: theme._primary.replace("#", "").convertToRGB(1.0)}}>
                    {content}
                </div>
                <div className="content-menagment-form">
                    {newContentJsx}
                </div>
                {userReducer.currentUser._id === album._created_by_id ? (
                    <div className="content-menagment-buttons">
                        <span>
                            <button onClick={e => addContent(e, "Text")}><IoText /></button>
                            <button onClick={e => addContent(e, "Lyrics")}><GrBlockQuote /></button>
                            <button onClick={e => addContent(e, "Image")}><BsFillImageFill /></button>
                            <button onClick={e => addContent(e, "Audio")}><GiSoundWaves /></button>
                        </span>
                        <button onClick={e => handleSubmit(e)}>Submit</button>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Track
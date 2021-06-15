import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../../User/userSlice"
import { getAlbum } from "../AlbumsSlice"
import AlbumCard from "./AlbumCard"

const Home = props => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAlbum())
        dispatch(getUser())
    }, [dispatch])

    const albumsReducer = useSelector(state => state.album)

    const [filter, setFilter] = useState("")

    const albumsJsx = albumsReducer.albums.filter(album => album._name.toLowerCase().includes(filter.toLowerCase())).map(album => (<AlbumCard album={album} />))

    return (
        <div className="container home">
            <div className="top">
                <div className="overlay">
                    <input placeholder="Search for an album" type="text" value={filter} onChange={e => setFilter(e.target.value)} />
                </div>
            </div>
            <div className="bottom">
                {albumsJsx}
            </div>
        </div>
    )
}

export default Home
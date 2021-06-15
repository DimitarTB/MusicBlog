import { Fragment } from "react"
import { Route } from "react-router-dom"
import CreateAlbum from "./features/Albums/Components/CreateAlbum"
import Home from "./features/Albums/Components/Home"
import Album from "./features/Albums/Components/Album"
import Login from "./features/User/Components/Login"
import Register from "./features/User/Components/Register"
import CreateTrack from "./features/Albums/Components/CreateTrack"
import Track from "./features/Albums/Components/Track"

export const UserRoutes = () => {
    return (
        <Fragment>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register} />
        </Fragment>
    )
}

export const AlbumsRoutes = () => {
    return (
        <Fragment>
            <Route path="/home" component={Home} />

            <Route path="/album/:_id" component={Album} />
            <Route path="/track/:_id" component={Track} />

            <Route path="/createAlbum" component={CreateAlbum} />
            <Route path="/createTrack/:_id" component={CreateTrack} />
            <Route path="/editAlbum/:_id" />
            <Route path="/editTrack/:_track_id" />
        </Fragment>
    )
}
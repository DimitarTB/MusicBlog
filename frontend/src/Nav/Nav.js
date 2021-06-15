import { useDispatch, useSelector } from "react-redux"
import {
    FaUserAlt,
    FaHome,
    FaPlusSquare,
    FaCaretSquareLeft
} from 'react-icons/fa'
import { NavLink, useLocation } from "react-router-dom"
import { logout } from "../features/User/userSlice"

import "./Nav.css"

const Nav = props => {
    const dispatch = useDispatch()
    const location = useLocation()
    const currentUser = useSelector(state => state.user.currentUser)
    return (
        <div className="nav">
            <h3>Music Blog</h3>
            {/* <NavLink className={location.pathname.includes("profile") ? "selected" : ""} to={"/profile/" + currentUser._id}>
                <span><FaUserAlt /></span>
                <p>Profile</p>
            </NavLink> */}
            <NavLink className={location.pathname.includes("home") ? "selected" : ""} to="/home">
                <span><FaHome /></span>
                <p>Home</p>
            </NavLink>
            {parseInt(currentUser._type_id) === 2 ? (
                <NavLink className={location.pathname.includes("createAlbum") ? "selected" : ""} to="/createAlbum">
                    <span><FaPlusSquare /></span>
                    <p>Create Ablum</p>
                </NavLink>
            ) : null}
            <NavLink to="/login" onClick={e => dispatch(logout())}>
                <span><FaCaretSquareLeft /></span>
                <p>Log out</p>
            </NavLink>
        </div>
    )
}

export default Nav
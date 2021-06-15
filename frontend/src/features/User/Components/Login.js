import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getData } from "../../General/GeneralSlice"
import Form, {
    input,
} from "../../../former/Form"

import { login } from "../userSlice"
import { Redirect } from "react-router"

import "./User.css"
import image from "../../../static/background.jpg"
import { NavLink } from "react-router-dom"

const Login = props => {
    const dispatch = useDispatch()
    const userReducer = useSelector(state => state.user)
    const [submitted, setSubmitted] = useState(false)
    const [user, setUser] = useState({
        _username: "",
        _email: "",
        _password: "",
        _confirm_password: "",
        _type_id: null
    })
    const [redirect, setRedirect] = useState(false)
    const [info, setInfo] = useState({ type: null, message: null })

    useEffect(() => {
        dispatch(getData())
    }, [dispatch])

    useEffect(() => {
        if (userReducer.loginStatus === "idle" || submitted !== true) return
        if (userReducer.loginStatus === "loading") return setInfo({ type: "loading", message: "Please wait while the server is processing your request" })
        if (userReducer.loginStatus === "fulfilled") {
            setRedirect(true)
            setInfo({ type: "success", message: "You have logged in successfully" })
        }
        if (userReducer.loginStatus === "error") return setInfo({ type: "error", message: userReducer.loginError })
    }, [userReducer, submitted])

    return (
        <div className="login lading-auth">
            {redirect === false ? null : <Redirect to={"/home"} />}
            {userReducer.currentUser?._id === undefined ? null : <Redirect to={'/home'} />}
            <img alt="Jimi Hedrix playing guitar" src={image} />
            <div>
                <Form
                    name="Login Form"
                    data={user}
                    fields={[
                        {
                            name: "_username",
                            label: "Username",
                            placeholder: "Please Enter Password",
                            fieldType: input,
                            type: "text",
                        },
                        {
                            name: "_password",
                            label: "Password",
                            placeholder: "Please Enter Password",
                            fieldType: input,
                            type: "password",
                        }
                    ]}
                    overloadedAfter={[
                        ( <h3 className="auth-redorect">Dont have an account? <NavLink to="/register">Register</NavLink></h3> )
                    ]}
                    buttonText="Login"
                    info={info}
                    handleChange={e => {
                        setUser({ ...user, [e.target.name]: e.target.value })
                        setInfo({ type: null, message: null })
                    }}
                    handleSubmit={e => {
                        e.preventDefault()
                        const data = new FormData()
                        data.append("_username", user._username)
                        data.append("_password", user._password)
                        setSubmitted(true)
                        dispatch(login(data))
                    }}
                />
            </div>
        </div>
    )
}

export default Login
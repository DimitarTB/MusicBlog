import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getData } from "../../General/GeneralSlice"
import Form, {
    select,
    input,
} from "../../../former/Form"

import { register } from "../userSlice"
import { Redirect } from "react-router"
import "./User.css"
import image from "../../../static/background.jpg"
import { NavLink } from "react-router-dom"

const Register = props => {
    const dispatch = useDispatch()
    const types = useSelector(state => state.general.general.user_types)
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
        if (userReducer.registerStatus === "idle" || submitted !== true) return
        if (userReducer.registerStatus === "loading") return setInfo({ type: "loading", message: "Please wait while the server is processing your request" })
        if (userReducer.registerStatus === "fulfilled") {
            setRedirect(true)
            setInfo({ type: "success", message: "You have successfully been registered" })
        }
        if (userReducer.registerStatus === "error") return setInfo({ type: "error", message: userReducer.registerError })
    }, [userReducer, submitted])

    return (
        <div className="register lading-auth">
            {redirect === false ? null : <Redirect to={"/home"} />}
            {userReducer.currentUser?._id === undefined ? null : <Redirect to={'/home'} />}
            <img alt="Jimi Hendrix playing guitar" src={image} />
            <div>
                <Form
                    name="Registration Form"
                    data={user}
                    fields={[
                        {
                            name: "_email",
                            label: "Email",
                            placeholder: "Please Enter Email",
                            fieldType: input,
                            type: "email",
                        },
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
                        },
                        {
                            name: "_confirm_password",
                            label: "Confirm Password",
                            placeholder: "Please Repeat Your Password",
                            fieldType: input,
                            type: "password",
                        },
                        {
                            fieldType: select,
                            name: "_type_id",
                            label: "Select your user type",
                            options: types.filter(type => type._id !== 1),
                            displayField: "_name",
                            valueField: "_id"
                        }
                    ]}
                    overloadedAfter={[
                        ( <h3 className="auth-redorect">Already have an account? <NavLink to="/login">Log in</NavLink></h3> )
                    ]}
                    buttonText="Register"
                    info={info}
                    handleChange={e => {
                        setUser({ ...user, [e.target.name]: e.target.value })
                        setInfo({ type: null, message: null })
                    }}
                    handleSubmit={e => {
                        e.preventDefault()
                        if (user._password !== user._confirm_password) return setInfo({ type: "warning", message: "Please make sure that your passwords match" })
                        for (const key in user) {
                            if (user[key] === "" || user[key] === null) return setInfo({ type: "warning", message: "Please make sure that all fiels are filled in correctly" })
                        }
                        setSubmitted(true)
                        const data = new FormData()
                        data.append("_email", user._email)
                        data.append("_password", user._password)
                        data.append("_username", user._username)
                        data.append("_type_id", user._type_id)

                        dispatch(register(data))
                    }}
                />
            </div>
        </div>
    )
}

export default Register
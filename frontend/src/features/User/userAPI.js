import { API_URL } from "../../../package.json"


export const _login = async user => {
    const res = await fetch(API_URL + "/api/user/login", { method: "POST", body: user })
    const data = await res.json()
    return data
}

export const _register = async user => {
    const res = await fetch(API_URL + "/api/user/register", { method: "POST", body: user })
    const data = await res.json()
    return data
}

export const _updateUser = async user => {
    const res = await fetch(API_URL + "/api/user/update", { method: "PUT", body: user })
    const data = await res.json()
    return data
}

export const _getUser = async (user_id = undefined) => {
    let url = API_URL + "/api/user/get"
    if (user_id !== undefined) url = API_URL + "/api/user/get?_id=" + user_id
    const res = await fetch(url)
    const data = await res.json()
    return data
}
import { API_URL } from "../../../package.json"


export const _createAlbum = async album => {
    const res = await fetch(API_URL + "/api/albums", {method: "POST", body: album})
    const data = await res.json()
    return data
}

export const _getAlbum = async (album_id = undefined) => {
    let url = API_URL + "/api/albums"
    if (album_id !== undefined) url = API_URL + "/api/albums?_id="+album_id
    const res = await fetch(url)
    const data = await res.json()
    return data
}

export const _createTrack = async track => {
    const res = await fetch(API_URL + "/api/tracks", {method: "POST", body: track})
    const data = await res.json()
    return data
}

export const _getTrack = async (track_id = undefined, album_id = undefined) => {
    let url = API_URL + "/api/tracks"
    if (album_id !== undefined) url = API_URL + "/api/tracks?_album_id="+album_id
    if (track_id !== undefined) url = API_URL + "/api/tracks?_id="+track_id
    console.log(url)
    const res = await fetch(url)
    const data = await res.json()
    return data
}

export const _createContent = async content => {
    const res = await fetch(API_URL + "/api/content", {method: "POST", body: content})
    const data = await res.json()
    return data
}

export const _getContent = async (content_id = undefined, track_id = undefined) => {
    let url = API_URL + "/api/content"
    if (track_id !== undefined) url = API_URL + "/api/content?track_id="+track_id
    if (content_id !== undefined) url = API_URL + "/api/content?_id="+content_id
    const res = await fetch(url)
    const data = await res.json()
    return data
}
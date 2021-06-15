import { API_URL } from "../../../package.json"

export const _getData = async () => {
    const res = await fetch(API_URL + "/api/data")
    const data = await res.json()
    return data
}
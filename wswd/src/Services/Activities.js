import axios from 'axios'
const baseUrl = 'http://192.168.1.6:4000/api/activities'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = newActivity => {
    const req = axios.post(baseUrl, newActivity)
    return req.then(res => res.data)
}

const update = (id, newActivity) => {
    const req = axios.put(`${baseUrl}/${id}`, newActivity)
    return req.then(response => response.data

    )
}
const remove = (id, delActivity) => {
    const req = axios.delete(`${baseUrl}/${id}`, delActivity)
    return req.then(response => response.data).catch((er) => {
        throw er.response.data
    })
}




export default { getAll, create, update, remove }
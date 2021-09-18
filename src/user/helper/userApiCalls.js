import {API} from '../../backend.js'

export const getOrders = async () => {
    return await fetch(`${API}/order/`, {
        method:"GET",
    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .catch(err => console.log(err))

}

export const getUser = (route) => {
    return fetch(`${route}`, {
        method:"GET",
    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .catch(err => console.log(err))
}
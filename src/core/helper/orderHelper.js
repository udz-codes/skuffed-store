import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
    const formData = new FormData()

    console.log(orderData)

    for(const key in orderData) {
        formData.append(key, orderData[key])
    }

    return fetch(`${API}/order/add/${userId}/${token}/`, {
        method: "POST",
        body: formData
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log(console.log(err))
    })

}
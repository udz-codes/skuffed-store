import { API } from "../../backend";

export const getMeToken = (userId, token) => {
    return fetch(`${API}/payment/gettoken/${userId}/${token}/`, {
        method: "GET"
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))
}

export const processPayment = (userId, token, paymentInfo) => {
    const formData = new FormData();

    for(const key in paymentInfo) {
        formData.append(key, paymentInfo[key])
    }
    
    return fetch(`${API}/payment/process/${userId}/${token}/`, {
        method: "POST",
        body: formData
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))
}
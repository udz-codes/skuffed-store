import {API} from '../../backend';
import { cartEmpty } from '../../core/helper/cartHelper';

export const signup = (user) => {
    return fetch(`${API}/user/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
}


export const signin = (user) => {
    const formData = new FormData();

    for (var name in user) {
        formData.append(name, user[name]);
    }

    return fetch(`${API}/user/login/`, {
        method: "POST",
        body: formData
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
}


export const authenticate = (data, next) => {
    if(typeof window != undefined) {
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
}


export const isAuthenticated = () => {
    if(typeof window != undefined) {
        if(localStorage.getItem("jwt")) {
            return JSON.parse(localStorage.getItem("jwt"));
        } else {
            return false;
        }
    }

    return false;
}


export const signout = (next) => {
    const userID = isAuthenticated() && isAuthenticated().user.id

    if(typeof window != undefined) {
        localStorage.removeItem("jwt");
        cartEmpty(() => {});

        return fetch(`${API}/user/logout/${userID}`, {
            method: "GET"
        })
        .then(res => {
            console.log(res)
            next();
        })
        .catch(err => {
            console.log(err)
        })
    }
}
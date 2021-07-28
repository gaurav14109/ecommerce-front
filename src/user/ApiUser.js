import {API} from '../config'

export const read = (userId, token) => {

    return fetch(`${API}/user/${userId}`, {
        method: 'GET',
        headers: {
            Application: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }

    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
    }

export const update = (userId, token, user) => {

    return fetch(`${API}/user/${userId}`, {
        method: 'PUT',
        headers: {
            Application: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)

    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
    }

//Updating the local Storage
export const updateUser = (user, next) => {

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('jwt')) {
            const auth = JSON.parse(localStorage.getItem('jwt'))

            auth.user = user //id name role and email
            localStorage.setItem('jwt', JSON.stringify(auth))
            next() //calling function passed in argument
        }
    }

}

export const listPurchaseHistory = (userId, token) => {
    return fetch(`${API}/orders/by/user/${userId}`, {
        method: 'GET',
        headers: {
            Application: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
    }
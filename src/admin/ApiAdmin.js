import {API} from '../config'
export const createCategory = (userId, token, category) => {

    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify(category) //convert to json string
    })
        .then(response => {

            return response.json() //javascript object
            //given a notification
        })
        .catch(err => {
            console.log(err)
        })

    }

export const createProduct = (userId, token, product) => {

    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // "Content-Type": 'application/json',as we are sending form data and not object
            Authorization: `Bearer ${token}`
        },

        body: product //convert to json string
    })
        .then(response => {

            return response.json() //javascript object
            //given a notification
        })
        .catch(err => {
            console.log(err)
        })

    }

export const getCategories = () => {

    return fetch(`${API}/category`, {method: 'GET'})
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
    }

export const listOrders = (userId, token) => {

    return fetch(`${API}/order/list/${userId}`, {
        method: 'GET',
        headers: {

            Accept: 'application/json',
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

export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: 'GET',
        headers: {

            Accept: 'application/json',
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

export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {

            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(status)

    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })

    }

export const getProducts = () => {

    return fetch(`${API}/products?limit=100`, {method: 'GET'})
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}
//Do not delete data change the status to Y or N
export const deleteProduct = (productId,userId,  token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {

            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })

}

export const getProduct = (productId) => {

    return fetch(`${API}/product/${productId}`, {method: 'GET'})
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}
//we are using form data in some cases because of image property
export const updateProduct = (productId,userId,  token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {

            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
        //product is a form data
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })

}
import {API} from '../config'
import queryString from 'query-string'
export const getProduct=(sortBy) =>{

    return fetch(`${API}/products?sort=${sortBy}&order=desc&limit=6`, {
        method: 'GET',

    }).then(response=>{return response.json()})
    .catch(err=>{
        console.log(err)
    })
}

export const getProductById=(productId) =>{

    return fetch(`${API}/product/${productId}`, {
        method: 'GET',

    }).then(response=>{return response.json()}) //sending response to where it called
    .catch(err=>{
        console.log(err)
    })
}



export const getCategories=() =>{

    return fetch(`${API}/category`, {
        method: 'GET',

    }).then(response=>{return response.json()})
    .catch(err=>{
        console.log(err)
    })
}
//we can pass params in get but in post we can
//pass request object in post method

export const listRelated=(productId) =>{

    return fetch(`${API}/products/related/${productId}`, {
        method: 'GET',

    }).then(response=>{return response.json()})
    .catch(err=>{
        console.log(err)
    })
}

export const getFilteredProduct = (skip, limit, filters={})=>{ //how many to skip
    const data = {
        skip, limit, filters
    }
    return fetch(`${API}/products/by/search`, {
        
        method: 'POST',
        headers:{
            Accept: 'application/json',
            "Content-Type": 'application/json'//as we are sending form data and not object
            
        },

        body:JSON.stringify(data) //convert to json string 
    }).then(response=>{
        
        return response.json() //javascript object
        //given a notification 
        //convert the string to json()
    }).catch(err=>{
            console.log(err)
    })

}

export const list= params =>{
    //converting params into query string using query-string
    const query = queryString.stringify(params)
    console.log(query, `${API}/products/search?${query}`)
    //for a query string of the object
    return fetch(`${API}/products/search?${query}`, {
        method: 'GET',

    }).then(response=>{return response.json()})
    .catch(err=>{
        console.log(err)
    })
}


export const getBraintreeClientToken= (userId, token) =>{
    //converting params into query string using query-string
    
    
    //for a query string of the object
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: 'GET',
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json',
            Authorization: `Bearer ${token}` 
            //get the brain client code and use to generate a drop in instance
        }

    }).then(response=>{return response.json()})
    .catch(err=>{
        console.log(err)
    })
}

//sending nonce and amonut to backend

export const processPayment = (paymentData, userId, token)=>{

    return fetch(`${API}/braintree/payment/${userId}`, {

        method: 'POST',
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json',
            Authorization: `Bearer ${token}` 
        },
        body:JSON.stringify(paymentData)
    }).then(response=>{

        return response.json() //goes to the method calling
    }).catch(err=>{
        console.log(err)
    })
}

export const createOrder = (createOrderData, userId, token)=>{

    return fetch(`${API}/order/create/${userId}`, {

        method: 'POST',
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json',
            Authorization: `Bearer ${token}` 
        },
        body:JSON.stringify({order:createOrderData})
    }).then(response=>{

        return response.json() //goes to the method calling
    }).catch(err=>{
        console.log(err)
    })
}
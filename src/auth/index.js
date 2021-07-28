import {API} from '../config'
export const signup = (user)=>{

    return fetch(`${API}/signup`, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },

        body:JSON.stringify(user) //convert to json string 
    }).then(response=>{
        
        return response.json() //javascript object
        //given a notification 
    }).catch(err=>{
            console.log(err)
    })

}

export const signin = (user)=>{

    return fetch(`${API}/signin`, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },

        body:JSON.stringify(user) //convert to json string 
    }).then(response=>{
        
        return response.json() //javascript object
        //given a notification 
    }).catch(err=>{
            console.log(err)
    })

}

export const authenticate = (data, next)=>{  //should be authenticated instead of authenticate
        //check windowObject is there or not
    if (typeof window !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(data)); //have both token and id
        next();//callback function
    }
 
}

export const signout = (next)=>{
    //check windowObject is there 
if (typeof window !== 'undefined'){
    localStorage.removeItem('jwt');
    next(); //call back function need to passed a function
    return fetch(`${API}/signout`,{
        method: 'GET'
    }).
    then(response=>{
        
        console.log(response)

    }).catch(err=>{console.log(error)})

}

}

export const isAuthenticated =()=>{
    //check windowObject is there 
    if (typeof window === 'undefined'){
        return false;
    }

    if (localStorage.getItem('jwt')){

        return JSON.parse(localStorage.getItem('jwt')) //pasrsing into json object since it stored as string in localStorage
    }
    else{
        return false
    }

}
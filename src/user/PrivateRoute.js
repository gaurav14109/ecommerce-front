import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom'
import {  isAuthenticated } from '../auth'
                        //props
const PrivateRoute = ({component:Component, ...rest})=>{ //rest of the props
                        //represnting component as Component
    
    return <Route {...rest} render={props=>isAuthenticated() && isAuthenticated().user.role === 0 ?(
        //using redner with route when need to pass props and extra info
        <Component {...props} />
    ):(
        <Redirect to={{pathname:'/signin', state:{from:props.location}}} />
    )}/>

}

export default PrivateRoute
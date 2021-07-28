import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom'
import {  isAuthenticated } from '../auth'
                        //props
const AdminRoute = ({component:Component, ...rest})=>{ //rest of the props
                        //represnting component as Component
                                    //when we need to pass props to component
    return <Route {...rest} render={props=>isAuthenticated() && isAuthenticated().user.role === 1 ?(
       
        <Component {...props} />
    ):(
        <Redirect to={{pathname:'/signin', state:{from:props.location}}} />
    )}/>

}

export default AdminRoute
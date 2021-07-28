import React from 'react';
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'
import {getItemCount} from './CartHelper'

//withRouter to access props history by default Router pass props to the called component
//which have some property

const isActive = (history, path)=>{
    // console.log(history)
    //if history.location.path is same passed path i.e current path then it is true color change
    if (history.location.pathname ===   path){

        return {color: '#ff9900'}
    }
    else{
        return {color: '#ffffff'}
    }
}


//destructing
const Menu = ({history})=>{
    return (
        <ul className = 'nav nav-tabs bg-primary'>
            <li className = 'nav-item'>
                <Link className = 'nav-link' to='/' style={isActive(history,'/')}>Home</Link>
            </li>
            <li className = 'nav-item'>
                <Link className = 'nav-link' to='/shop' style={isActive(history,'/shop')}>Shop</Link>
            </li>
            <li className = 'nav-item'>
                <Link className = 'nav-link' to='/cart' style={isActive(history,'/shop')}>
                Cart <sup><small className='cart-badge'>{getItemCount()}</small></sup>
                </Link>
                {/* hutml super script sup */}
                
            </li>
            {
                !isAuthenticated()&&
            <li className = 'nav-item'>
                <Link className = 'nav-link' to='/signin' style={isActive(history,'/signin')}>Signin</Link>
            </li>}
            {!isAuthenticated()&&
            <li className = 'nav-item'>
                <Link className = 'nav-link' to='/signup' style={isActive(history,'/signup')}>Signup</Link>
            </li>    
            }
            {isAuthenticated()&&
            <li className = 'nav-item'>

                {/* push user to home */}
                <span className = 'nav-link' onClick={()=>signout(()=>{history.push('/')})} style={{cursor:'pointer', color:'#ffffff'}}>Signout</span>
            </li>                                                       
                    //    passing a callback
}               
            {isAuthenticated() && isAuthenticated().user.role === 0 && <li className = 'nav-item'>
                <Link className = 'nav-link' to='/user/dashboard' style={isActive(history,'/user/dashboard')}>Dashboard</Link>
            </li>}                                                        
            {isAuthenticated() && isAuthenticated().user.role === 1 && <li className = 'nav-item'>
                <Link className = 'nav-link' to='/admin/dashboard' style={isActive(history,'/admin/dashboard')}>Dashboard</Link>
            </li>} 

        </ul>
    )
}

export default withRouter(Menu);
//props will be there in menu with help from withRouter

//provide props.loaction
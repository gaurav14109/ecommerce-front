import React, {useState} from 'react';
import Layout from '../core/Layout'
import {  isAuthenticated } from '../auth'
import { Link } from 'react-router-dom';
const AdminDashboard = (props)=>{
    const {user:{_id, name, email, role}} = isAuthenticated()

    const adminLinks = ()=>{

        return (
            <div className = 'card'>
                <h4 className='card-header'> User Links</h4>
                <ul className='list-group'>
                        <li className='list-group-item'>
                            <Link className='nav-link' to='/create/category'>Create Category</Link>
                        </li>
                        <li className='list-group-item'>
                            <Link className='nav-link' to='/create/product'>Create Product</Link>
                        </li>
                        <li className='list-group-item'>
                            <Link className='nav-link' to='/admin/orders'>View Orders</Link>
                        </li>
                        <li className='list-group-item'>
                            <Link className='nav-link' to='/admin/products'>Manage Products</Link>
                        </li>
                    </ul>
            </div>
        )
    }
    const adminInfo = ()=>(
        <div className='card mb-5'>
        <h3 className='card-header'>User Information</h3>
        <ul className='list-group'>
            <li className='list-group-item'>{name}</li>
            <li className='list-group-item'>{email}</li>
            <li className='list-group-item'>{role == 0?'General':'Admin'}</li>
        </ul>
    </div>
    )
 
    return (
        <Layout title='Dashboard' 
        description={`G'Day ${name}`} className = 'container' >
            <div className = 'row'>

                <div className = 'col-3'>
                {adminLinks()}
                </div>
                <div className = 'col-9'>
                {adminInfo()}

                </div>
            </div>
            
        </Layout>
    )
}


export default AdminDashboard;
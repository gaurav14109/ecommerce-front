import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom';
import {listPurchaseHistory} from './ApiUser'
import moment from 'moment'
const UserDashboard = (props) => {
    const {
        user: {
            _id,
            name,
            email,
            role
        },
        token
    } = isAuthenticated()

    const [userpurchaseHistory, setuserPurchaseHistory] = useState([])

    const init = () => {

        listPurchaseHistory(_id, token).then(data => {

            if (data.error) {

                console.log(data.error)
            } else {

                setuserPurchaseHistory(data)
            }
        })

    }

    useEffect(() => {

        init()

    }, [])
    const userLinks = () => {

        return (
            <div className='card'>
                <h4 className='card-header'>
                    User Links</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/cart'>My Cart</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to={`/profile/${_id}`}>Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const userInfo = () => (
        <div className='card mb-5'>
            <h3 className='card-header'>User Information</h3>
            <ul className='list-group'>
                <li className='list-group-item'>{name}</li>
                <li className='list-group-item'>{email}</li>
                <li className='list-group-item'>{
                        role == 0
                            ? 'General'
                            : 'Admin'
                    }</li>
            </ul>
        </div>
    )
    const purchaseHistory = () => (
        <div className='card mb-5'>
            <h3 className='card-header'>Purchase history</h3>
            <ul className='list-group'>
                <li className="list-group-item">
                    {
                        userpurchaseHistory.map((h, i) => {
                            return (
                                <div key={i}>
                                    <hr/> {
                                        h
                                            .products
                                            .map((p, i) => {
                                                return (
                                                    <div key={i}>
                                                        <h6>Product name: {p.name}</h6>
                                                        <h6>Product price: ${p.price}</h6>
                                                        <h6>
                                                            Purchased date:{" "}
                                                            {moment(p.createdAt).fromNow()}
                                                        </h6>
                                                    </div>

                                                );
                                            })
                                    }

                                </div>
                            );
                        })
                    }
                </li>

            </ul>
        </div>
    )
    return (
        <Layout title='Dashboard' description={`G'Day ${name}`} className='container'>
            <div className='row'>

                <div className='col-3'>
                    {userLinks()}
                </div>
                <div className='col-9'>
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>

        </Layout>
    )
}

export default UserDashboard;
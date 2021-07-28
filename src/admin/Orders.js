import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {listOrders,getStatusValues, updateOrderStatus} from './ApiAdmin'
import moment from 'moment'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [values, setValues] = useState([])
    const {user, token} = isAuthenticated()
    const loadOrders = () => {

        listOrders(user._id, token).then(data => {

            if (data.error) {

                console.log(data.error)
            } else {

                setOrders(data)
            }
        })

    }

    const loadStatusValues = () => {

        getStatusValues(user._id, token).then(data => {

            if (data.error) {

                console.log(data.error)
            } else {

                setValues(data)
            }
        })

    }
    
    useEffect(() => {
        loadOrders()
        loadStatusValues()
    }, []) //[] is to which variable render should run

    const showInput = (key, value) => {
        return (
            <div className='input-group mb-2 mr-sm-2' style={{display: 'block'}}>
                <div className='input-group-prepend'>

                    <div className='input-group-text'>
                        {key}
                    </div>
                    <input type='text' value={value} className='form-control' readOnly/>
                </div>
            </div>
        )
    }

    const handleStatusChange =  (e,orderId)  =>{
        const status = {orderId:orderId, status:e.target.value}
        updateOrderStatus(user._id, token, orderId, status).then(data=>{

            if(data.err){

            }
            else{
                loadOrders()
            }
        })
        //sending userid orderid and status for order update
    }
    const showStatus = (o)=>(

        <div className = 'form-group'>
            <h3 className = 'mark mb-4'>Status: {o.status}</h3>

            <select className = 'form-control' onChange = {(e)=>handleStatusChange( e,o._id)}> 
            {/* when it will be clicked then only handle status change not on rendering */}

                <option>Update Status</option>
                {values.map((status, i)=>(

                    <option key={i} value={status}>{status}</option>

                ))}
            </select>
        </div>
    )

    const showOrders = () => {
        {
            console.log(orders)
        }
        return orders.map((order, i) => (

            <div
                key={i}
                className='mt-5'
                style={{
                    borderBottom: '5px solid indigo'
                }}>

                <h2 className='mb-5'>
                    <span className='bg-primary'>Order ID: {order._id}</span>
                </h2>
                <ul className='list-group mb-2'>
                    <li className='list-group-item'>
                        Order Status: {showStatus(order)}
                    </li>
                    <li className='list-group-item'>
                        Transaction_id: {order.transaction_id}
                    </li>
                    <li className='list-group-item'>
                        Amount: {order.amount}
                    </li>
                    <li className='list-group-item'>
                        Order by: {order.user.name}
                    </li>
                    <li className='list-group-item'>
                        order on: {moment(order.createdAt).fromNow()}
                    </li>
                    <li className='list-group-item'>
                        Delivery Address: {order.address}
                    </li>
                    <h3 className='mt-4 mb-4 font-italic'>Total Products in the Order {order.products.length}</h3>
                    {
                        order
                            .products
                            .map((p, i) => (

                                <div
                                    className='mb-4'
                                    key={i}
                                    style={{
                                        padding: '20px',
                                        border: '1px solid indigo'
                                    }}>
                                    
                                    {showInput('Product name', p.name)}
                                    {showInput('Product Price', p.price)}
                                    {showInput('Product total', p.count)}
                                    {showInput('Product Id', p._id)}
                                </div>
                            ))
                    }
                </ul>
            </div>

        ))

    }

 
    const showOrderLength = orders => {

        if (orders.length > 0) {

            return (
                <h1 className='text-danger display-2'>Total Orders :{orders.length}</h1>
            )
        } else {

            return <h1 className='text-danger'>No Orders</h1>
        }

    }

    return <Layout
        title='Orders'
        description={`G.day ${user.name}Manage Orders`}
        className='container-fluid'>

        <div className='row'>
            <div className='col_md-8 offset-md-2'>
                {showOrderLength(orders)}
                {orders.length > 0 && showOrders()}
                {/* {JSON.stringify(orders)} */}
            </div>
        </div>
    </Layout>

}

export default Orders

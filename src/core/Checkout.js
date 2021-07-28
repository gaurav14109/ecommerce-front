import React, {useState, useEffect} from 'react';
import DropIn from 'braintree-web-drop-in-react'
import Layout from './Layout';
import {Link} from 'react-router-dom';
import {getProduct, getBraintreeClientToken, processPayment, createOrder} from './ApiCore'
import Card from './Card';
import {isAuthenticated} from '../auth'
import {emptyCart} from './CartHelper'
const Checkout = ({
    products,
    setRun = f => f,
    run = undefined
}) => {

    const [data, setData] = useState({
        success: false, clientToken: null, error: '', instance: {}, //will be used for dropping new UI for Payment i.e braintree-drop-ui to have ui page
        address: ""
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(d => {

            if (d.error) {
                setData({
                    ...data,
                    error: d.error
                })
            } else {

                setData({
                    ...data,
                    clientToken: d.clientToken
                })
                //token received will be used with braintree-web-drop-in-react package
            }
        })

    }

    useEffect(() => {

        getToken(userId, token)

    }, [])

    const getTotal = () => {
        //nextValue is the array on single element element
        return products.length > 0 && products.reduce(
            function (currentValue, nextValue) {

                return currentValue + nextValue.count * nextValue.price
            },
            0
        )
        //current value is defined as 0
    }
    const showCheckOut = () => {

        return isAuthenticated()
            ? (<div>{showDropIn()}</div>)
            : (
                <Link to="/signin">
                    <button className='btn btn-primary' onClick="onClick">
                        Sign in to checkout
                    </button>
                </Link>
            )
    }
    const buy = () => { //will call backend api
        // send nounce(price and product to braintree) to my server nounce =
        // data.instance.paymentMethod this property is inside the instance which is
        // received when
        let nonce;
        let getNonce = data
            .instance
            .requestPaymentMethod()
            .then(d => {
                // paymnt process start with instance payment method paypal google etc using the creating instance
                // instance data will be card number etx console.log(data) nonce = data.nonce;
                // payment method data.details have card details nonce ie, card type number send
                // nonce as paymentMethodNonce to backend console.log('send nonce and total to
                // backend', nonce, getTotal(products))
                // tokencc_bh_s8kpfd_j566nk_pbtxwv_sbrybg_gp2 23 empty cart and create order
                const paymentData = {
                    amount: getTotal(products),
                    paymentMethodNonce: d.nonce
                } //nonce and amount

                processPayment(paymentData, userId, token) //processed by backend
                    .then(response => {

                        // creating the order and empty the cart after payment delivery address should
                        // be there.
                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: data.address
                        }
                        createOrder(createOrderData, userId, token)
                            .then(response => {
                                emptyCart(() => {
                                    console.log('payment success and cart Empty')
                                    setRun(!run)
                                    setData(
                                        {
                                            ...data,
                                            success: response.success
                                        }
                                    )
                                })

                            })
                            .catch(error => {
                                console.log(error);
                                setData({loading: false});
                            });

                    })
                    .catch(err => console.log(err))

                })
            .catch(error => {
                console.log(error)
                setData({
                    ...data,
                    error: error.message
                })
            })
        }
 const handleAddress = event => {

        setData(
            {
                ...data,
                address: event.target.value
            }
        )
    }
    const showDropIn = () => (

        <div
            onBlur={() => setData({
                ...data,
                error: ''
            })}>{
                data.clientToken !== null && products.length > 0
                    ? (

                        <div>
                            <div className="gorm-group mb-3">
                                <label className="text-muted">Delivery address:</label>
                                <textarea
                                    onChange={handleAddress}
                                    className="form-control"
                                    value={data.address}
                                    placeholder="Type your delivery address here..."/>
                            </div>
                            <DropIn
                                options={{
                                    authorization: data.clientToken,
                                    paypal: {
                                        flow: 'vault' //for paypal instance
                                    }
                                }}
                                onInstance={instance => data.instance = instance}/>
                                {/* instance is received from UI passed when pay is clicked */}
                            <button onClick={buy} className='btn btn-primary btn-block'>Pay</button>
                        </div>
                        // passing onInstance parameterto DropIn with parameter instance which will be
                        // sent when dropin ui is created onInstance is a arrow function with intance
                        // parameter  current instance is dropin
                    )
                    : null
            }</div>

    )
    const showSuccess = (success) => (

        <div
            className='alert alert-info'
            style={{
                display: success
                    ? ''
                    : 'none'
            }}>
            Thank you for Payment! happy shopping {success}
        </div>

    )
    return (
        <div>
            <h2>Total: ${
                    products.length > 0
                        ? getTotal()
                        : 0
                }</h2>
            {showSuccess(data.success)}
            {showCheckOut()}
        </div>
    )

}

export default Checkout
// splice take in the index and delete upto the index given array.splice(1,1)
// drop in info will passed to backend brain tree having a purchase history
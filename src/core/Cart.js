import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import Card from './Card'
import {getCart} from './CartHelper'
import Layout from './Layout'
import Checkout from './Checkout'
const Cart = () => {

    const [cartItems, setCartItems] = useState([])

    // since cartItem is a state have previous state as null, when caritems changes
    // useeffect will be called which goes into infinite loop as cartitem will keep
    // on changing   as cartItems is a Api call initial render is true
    const [run, setRun] = useState(true); //will change run to true when addTocart is called and then set to false
    // once update of the state is done and when remove is clicked again will change
    // run to true get previous state
    const loadCartItem = () => {
        console.log('Max Depth...') //one way is to use redux store action and dispatcher
        const cartItems = getCart()
        //have count to cartItems
        setCartItems(cartItems)

    }
    useEffect(() => {

        loadCartItem()

    }, [run])
    //run state changes from false to true then only run loadCart
    const showItems = () => {

        return (
            <div>
                <h2>Your cart has {`${cartItems.length}`}</h2>
                <hr/> {
                    cartItems.map((p, i) => (
                        //cartitem have count to it
                        <Card key={i} product={p} showAddButton={false} updateCart={true} showRemoveProductButton={true} setRun={setRun}
                            //setRun and run to be passed in the card to when delete is clicked change it to true and false
                            run={run} />
                    ))
                }
            </div>
        )
    }
    const noItemsMessage = () => {
        <h2>Your cart is empty.
            <hr/>
            <Link to='/shop'>Continue Shopping</Link>
        </h2>
    }

    return (
        <Layout
            title='Shopping Cart'
            description='Manage Your Cart Items. Add remove checkout or continue shopping.'
            className={'container-fluid'}>

            <div className='row'>

                <div className='col-6'>

                    {
                        cartItems.length > 0
                            ? showItems()
                            : noItemsMessage()
                    }
                </div>

                <div className='col-6'>
                    {/* Showing  checkout and price*/}
                    <h2 className='mb-4'>Your Cart Summary</h2>
                    <hr/>
                    <Checkout products={cartItems} setRun={setRun} run={run}
                        //setRun and run to be passed in the card to when delete is clicked change it to true and false
                        />
                </div>
            </div>
        </Layout>
    )

}

export default Cart;

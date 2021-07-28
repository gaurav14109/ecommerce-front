import React, {useState} from 'react';

import {Link,Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import {addItems,updateItem, removeItem} from './CartHelper'

const Card = ({
    product,
    showViewProductButton = true,
    showAddButton = true,
    updateCart = false,
    showRemoveProductButton=false,
    run=undefined, //only passed by cart
    setRun=f=>f,//default value of the funtion is f setRun is passed only by cart
}) => {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)
    const ShowViewButton = () => (
        <Link to={`/product/${product._id}`}>
            {
                showViewProductButton && <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                        View Product
                    </button>
            }
        </Link>
    )
    const addToCart = ()=>{

        addItems(product, ()=>{
            setRedirect(true)//callback function
        })
    
    }
    const shouldRedirect = (redirect)=>{
        if(redirect){
            return <Redirect to='/cart'/>
        }
    }
    const addButton = () => (
        <button onClick={addToCart} className='btn btn-outline-warning mt-2 mb-2'>
            Add To Cart
        </button>
    )
    const showStock = (quantity)=>{
        return quantity>0?(<span className='badge badge-primary badge-pill'>In Stock</span>)
        :(<span className='badge badge-danger badge-pill'>Out Of Stock</span>)
    }
    const handleCount = productId=> event=>{

        setCount(event.target.value < 1?1:event.target.value)

        if (event.target.value>=1){

            updateItem(productId,event.target.value)
            setRun(!run)
        }
    }
    const showCartUpdateOptions = ()=>{

        return updateCart && <div className = 'input-group mb-3'>
            <div className = 'input-group-prepend'>
                <span className = 'input-group-text'>Adjust Quantity</span>
            </div>
            <input type='number' className = 'form-control' value={count} onChange={handleCount(product._id)} /> 
            {/* maintaining the state of the count */}
            
        </div>
        
    }
    const showRemoveButton =()=>{

        return (showRemoveProductButton && (<button onClick={()=>{removeItem(product._id)
            setRun(!run)// run useEffect in parent Cart
        }}
        className = 'btn btn-outline-danger mt-2 mb-2'>Remove Product</button>))

    }
    return (
        <div className='card'>
            <div className='card-header'>
                {product.name}
            </div>
            <div className='card-body'>
                {/* showing similar products using by sending productid and using prduct categories in backend */}
                {redirect && shouldRedirect(redirect)}
                <ShowImage item={product} url={'product'}/>
                <p className='lead mt-2'>{product.description}</p>
                <p className='black-10'>Price: ${product.price}</p>
                <p className='black-9'>Category:{product.category && product.category.name}</p>
                <p className='black-8'>Added on {moment(product.createdAt).fromNow()}</p>
                {showStock(product.quantity)}<br/>
                {showViewProductButton && ShowViewButton()}
                {showAddButton && addButton()}
                {showRemoveProductButton && showRemoveButton()}
                {updateCart && showCartUpdateOptions()}
            </div>
        </div>
    )

}

export default Card
//class prepand for inline
//parent component is cart and card is the child component
//so changes should be passed to parent
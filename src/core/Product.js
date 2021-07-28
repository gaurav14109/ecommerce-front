import React, {useState, useEffect} from 'react';
import Layout from './Layout'
import {getProductById, listRelated} from './ApiCore'
import Card from './Card'
import Search from './Search';


const Product = (props) => {
    //in props we can get the params and send the api request.
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)
    const [relatedProduct, setRelatedProduct] = useState([])

    const loadSingleProduct = productId =>{

        getProductById(productId).then(data=>{

            if(data.error){
                setError(data.error)
            }else{
                setProduct(data);
            }
        })
    }
    const listRelatedProduct = (ProductId)=>{

        listRelated(ProductId).then(data=>{
            if (data.error){
                console.log(data.error)
            }else{
                setRelatedProduct(data)
            }
        })
        
    }
    useEffect(()=>{
        // console.log(props) match has params id
        const ProductId = props.match.params.productId
         loadSingleProduct(ProductId) //will run only once when state changes or any component chnages but second 
         //click does not change the state
         listRelatedProduct(ProductId)

    },[props]) //here we define when ever props changes trigger useEffect we define the variable
    return (    
        <Layout
            title={product && product.name}
            description={product && product.description}
            className={'container-fluid'}>
              <h2 className='mb-4'>Single Product</h2>
              <div className='row'>
                 <div className='col col-md-8'> 
                {product && <Card product= {product} showViewProductButton={false}/>}
                </div>

                <div className='col col-md-4'>
                    <h4>Related Product</h4>
                    {relatedProduct.map((p, i)=>(
                       <div key={i} className = 'mb-3'> 
                        <Card  product={p} />
                       </div> 
                    ))}
                </div>
              </div>

        </Layout>
    );

}

export default Product;
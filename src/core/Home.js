import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import {getProduct} from './ApiCore'
import Card from './Card'
import Search from './Search';
const Home = ()=> {
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductsBySell= ()=>{

        getProduct('sold').then(data=>{

            if(data.error){
                setError(data.error)
            }else{
                
                setProductsBySell(data)
            }

        })

    }
    const loadProductsByArrival= ()=>{

        getProduct('createdAt').then(data=>{

            if(data.error){
                setError(data.error)
            }else{
               
                setProductsByArrival(data)
            }

        })

    }
    useEffect(()=>{
        loadProductsBySell()
        loadProductsByArrival()

    },[])
    return (<Layout title = 'Home Page' description = 'Node React E-commerce App'
            className={'container-fluid'}>
               <Search />
            <h2 className = "mb-4">Best Sellers</h2>
            <div className='row'>
            {productsBySell.map((p,i)=>(
                <div key = {i} className='col-4 mb-3'>
                    <Card key = {i} product={p}/>
                </div>
            ))}

            </div>
         
            <h2 className = "mb-4">New Arrivals</h2>
            <div className='row'>
            {productsByArrival.map((p,i)=>(
                <div key = {i} className='col-4 mb-3'>
                    <Card  product={p} />
                </div>
            ))}
            </div>
            </Layout>
        );
};


export default Home;
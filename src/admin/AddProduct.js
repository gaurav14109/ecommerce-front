import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout'
import {  isAuthenticated } from '../auth'
import {Link} from 'react-router-dom'
import {createProduct, getCategories } from './ApiAdmin'

const AddProduct = ()=>{
const {user, token} = isAuthenticated()

const [values, setValues] = useState({
    name:'',
    description:'',
    price:'',
    categories:[], //pull all categories from backend.
    category:'',
    shipping:'',
    quantity:'',
    photo:'',
    loading:false, 
    error:'',
    createdProduct:'',
    redirectToProfile:false,
    formData:''

})
const {   
name,
description,
price,
categories, //pull all categories from backend.
category,
shipping,
quantity,
loading, 
error,
createdProduct,
redirectToProfile,
formData} = values

const init = ()=>{
        getCategories().then((data)=>{

        if (data.error){
            
        }else{
               
                setValues({...values, categories:data,
                     formData:new FormData()})
        }
    })
}
useEffect(()=>{


    init()
   
    //will change on component mount
    //formData will populate everything

},[])//array means all values

const handleChange= name=>event=>{

    const value = name === 'photo'? event.target.files[0] : event.target.value
    //other than photo
    formData.set(name, value) //setting format name with value
    
    setValues({...values, [name]:value})
}

const clickSubmit = (e)=>{
    e.preventDefault()
    setValues({...values,loading:true, error:''})
    createProduct(user._id, token, formData ).
    then(data=>{

        if (data.error){
            setValues({...values,loading:false, error:true})
        }else{
            setValues({...values,loading:false, 
            name:'',description:'',photo:'',price:'',
            quantity:'',createdProduct:data.name})
        }

    })

}
const showError = ()=>(

        <div className = 'alert alert-danger'>
            {error}
        </div>

)
const showLoading = ()=>(

 
        <h2>Loading</h2>
   

)
const productForm = ()=>(
   
    <form className='mb-3' onSubmit={clickSubmit}>
        <h4>Post Photo</h4> 
        <div className='form-group'>
            <label className='btn btn-secondary'>
            <input onChange={handleChange('photo')} type = 'file' name='photo' accept="image/*" />
            </label>
            
        </div>
        <div className='form-group'>
            <label className='text-muted'>
                Name
            </label>
            <input onChange={handleChange('name')} type = 'text' className='form-control' value={name}/>
            
        </div>
        <div className='form-group'>
            <label className='text-muted'>
                Description
            </label>
            <input onChange={handleChange('description')} type = 'text' className='form-control' value={description}/>
            
        </div>
        <div className='form-group'>
            <label className='text-muted'>
                Price
            </label>
            <input onChange={handleChange('price')} type = 'number' className='form-control' value={price} />
            
        </div>
        <div className='form-group'>
            <label className='text-muted'>
                Category
            </label>
            <select onChange={handleChange('category')} type = 'text' className='form-control' value={category} required>
               <option>Please select</option>

                {categories && categories.map(category =>(

                    <option value={category._id} 
                    key={category._id}>{category.name}</option>
                ))}
            </select>
            
        </div>   
        <div className='form-group'>
            <label className='text-muted'>
                Shipping
            </label>
            <select onChange={handleChange('shipping')} type = 'text' className='form-control' value={shipping}>
                <option>Please select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
            </select>
            
        </div>   
        <div className='form-group'>
            <label className='text-muted'>
                Quantity
            </label>
            <input onChange={handleChange('quantity')} type = 'number' className='form-control' value={quantity} />
            
        </div> 

        <button className = 'btn btn-outline-primary'>
            Create Product
        </button>
      
    </form>

)

return <Layout title='Add a new Product' 

description={`G'Day ${user.name}, ready to add a new category`}
 className = 'container-fluid' >

    <div className = 'row'>

        <div className = 'col-md-8 offset-md-2'>
        {error && showError()}
        {loading && showLoading()}
            {productForm()}
        </div>
    </div>
    
</Layout>

}

export default AddProduct;
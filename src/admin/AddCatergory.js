import React, {useState} from 'react';
import Layout from '../core/Layout'
import {  isAuthenticated } from '../auth'
import {Link} from 'react-router-dom'
import {createCategory} from './ApiAdmin'
const AddCategory = ()=>{

    const [values, setValues] = useState({
            name:'',
            error:false,

            success:false,
            loading:false
    })
    const {user, token} = isAuthenticated()
    const {name, error, success, loading} = values
    const handleChange = e =>{
        e.preventDefault();
        setValues({...values, name:e.target.value, error:'',success:false})
    }

    const clickSubmit = (e)=>{
        e.preventDefault();
        setValues({...values, loading:true, error:''})
        createCategory(user._id,token,{name}) //name as a object
        .then(data=>{
                if (data.error){

                    setValues({...values,loading:false, error:true})
                }else{
                    setValues({...values,loading:false, success:true, error:'', name:''})
                }

        })
  
    }

    const showLoading = ()=>(
            <h3 style={{display:loading?'':'none'}}>loading</h3>
    )
            
    const showSuccess = ()=>{
            return <h3 className="text-success">Category is created</h3>

    }
    const showError = ()=>{

            return <h3 className="text-danger">Category Name should be unique</h3>
    }

    const goBack = ()=>{
        
        return  <div className="mt-5">
            <Link to='/admin/dashboard' className='text-warning'>
                Back to Dashboard
            </Link>
        </div>
    }
    const newCategoryForm = ()=>(

         <form onSubmit={clickSubmit}>
                <div className='form-group'>
                    <label className = 'text-muted'>Name</label>
                    <input type= 'text' className='form-control' onChange={handleChange}
                     value={name} autoFocus></input>
                </div>
                <button className='btn btn-outline-primary'>Create Category</button>
        </form>
    )
    return (
        <Layout title='Add a new Category' 
        description={`G'Day ${user.name}, ready to add a new category`}
         className = 'container-fluid' >

            <div className = 'row'>

                <div className = 'col-md-8 offset-md-2'>
                {showLoading()}
                {error && showError()}
                {success && showSuccess()}
                {newCategoryForm()}
                {goBack()}

                </div>
            </div>
            
        </Layout>
    )

}


export default AddCategory;
import React, {useState} from 'react';
import Layout from '../core/Layout'

import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate } from '../auth';
import {  isAuthenticated } from '../auth'
//when a button is clicked it crates
//new context object to access any function we have to use this.
const Signin = ()=> {
    //use state return a setState function
    const [values, setValue] = useState({

        email:'gauravgusain48@gmail.com',
        password:'Gaur@v1497',
        error:'',
        loading:false,
        redirectToReferrer:false

    }); //value object passing only the key
    //curring function when name is passed it return a 
    //function by default
    

    const { email , password,error,loading,redirectToReferrer} = values
    const {user} = isAuthenticated()
    const handleChange=name=>event=>{

        setValue({...values, error:false, [name]:event.target.value})

    }

    const submit = (event)=>{
        event.preventDefault()
        setValue({...values, error:true ,loading:true})
        signin({email, password})
        .then(data=>{
            
            if (data.error){
                setValue({...values,error:data.error, loading:false})
                return 
            }
            //callback function
            //callback function called in nexts
           authenticate(data,()=>{setValue({...values,
            redirectToReferrer:true
        })}
)
        })
         //json script object
 }

    const showError = ()=>(

        <div className='alert alert-danger' style={{display:error?'':'none'}}>
            {error}
        </div>
    )
    const showLoading = ()=>(

       loading && (<div className = 'alert alter-info'>
           <h2>Loading</h2>
       </div>)
    )
    
    const redirectUser = ()=>{
        if (redirectToReferrer ){
            if (user && user.role === 0){
            return <Redirect to='/user/dashboard' />
            }else{
                return <Redirect to='/admin/dashboard' />
            }
        }
        if (isAuthenticated() ){ //if user is authenticted no need
            
            return <Redirect to='/' />
        }
    }
 
    const signUpForm = ()=>(

        <form>
            <div className = 'form-group'>
                <label className = 'text-muted'>Email</label>
                <input onChange={handleChange('email')}
                type = 'email' className = 'form-control' value = {email}/>
                
            </div>
            <div className = 'form-group'>
                <label className = 'text-muted'>Password</label>
                <input onChange={handleChange('password')}
                type = 'password' className = 'form-control' value = {password}/>
            </div>
            <button onClick={submit}>Submit</button>
        </form>
    )
    return (<Layout 
    title = 'Signin Page' description = 'Signup Using Email'
    className = 'container'>

      {showError()}  
      {showLoading()}
      {signUpForm()}
      {redirectUser()}
      {/* {JSON.stringify(values)} */}
    
    </Layout>);};


export default Signin;
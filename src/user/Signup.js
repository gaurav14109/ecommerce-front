import React, {useState} from 'react';
import Layout from '../core/Layout'

import { Link } from 'react-router-dom';
import { signup } from '../auth';
//when a button is clicked it crates
//new context object to access any function we have to use this.
const Signup = ()=> {
    //use state return a setState function
    const [values, setValue] = useState({

        name:'',
        email:'',
        password:'',
        error:'',
        success:false

    }); //value object passing only the key
    //curring function when name is passed it return a 
    //function by default
    

    const {name, email , password,error,success} = values
    const handleChange=name=>event=>{

        setValue({...values, error:false, [name]:event.target.value})

    }


    const submit = (event)=>{
        event.preventDefault()
        setValue({...values, error:false})
        signup({name, email, password})
        .then(data=>{
            
            if (data.error){
                setValue({...values,error:data.error, success:false})
                return 
            }

            setValue({...values,
            name:'',
            email:'',
            password:'',
            error:'',
            success:true})

        })
         //json script object
    }

    const showError = ()=>(

        <div className='alert alert-danger' style={{display:error?'':'none'}}>
            {error}
        </div>
    )
    const showSuccess = ()=>(

        <div className='alert alert-info' style={{display:success?'':'none'}}>
            New Account is created successfully, kindly <Link to='/signin'>Signin</Link>
        </div>
    )


    const signUpForm = ()=>(

        <form>
            <div className = 'form-group'>
                <label className = 'text-muted'>Name</label>
                <input onChange={handleChange('name')}
                 type = 'text' className = 'form-control'/>
            </div>
            <div className = 'form-group'>
                <label className = 'text-muted'>Email</label>
                <input onChange={handleChange('email')}
                type = 'email' className = 'form-control'/>
            </div>
            <div className = 'form-group'>
                <label className = 'text-muted'>Password</label>
                <input onChange={handleChange('password')}
                type = 'password' className = 'form-control'/>
            </div>
            <button onClick={submit}>Submit</button>
        </form>
    )
    return (<Layout 
    title = 'Signup Page' description = 'Signup Using Email'
    className = 'container'>

      {showError()}  
      {showSuccess()}
      {signUpForm()}
      {/* {JSON.stringify(values)} */}
    
    </Layout>);};


export default Signup;
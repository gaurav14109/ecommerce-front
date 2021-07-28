import React, {useEffect, useState} from 'react';
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link, Redirect} from 'react-router-dom'

import {read, update, updateUser} from './ApiUser'

const Profile = (props) => {

    const [user, setUser] = useState(
        {name: '', email: '', password: '', error: false, success: false}
    )
    const {token} = isAuthenticated()

    const {name, email, password, error, success} = user
    const init = (userId) => {

        read(userId, token).then(data => {
            if (data.error) {

                setUser({
                    ...user,
                    error: true
                })
            }

            setUser({
                ...user,
                name: data.name,
                email: data.email
            })
        })

    }

    useEffect(() => {
        init(props.match.params.userId)

    }, [])
    // advantage of the arrow function is it does not have its own context or
    // instance so it can use the current current using this in class similar
    // function have it own instance and class
    const handleChange = name => e => {

        setUser({
            ...user,
            [name]: e.target.value,
            error: false
        })

    }
    const clickSubmit = e => {

        e.preventDefault()
        update(props.match.params.userId, token, {name, email, password}).then(
            data => {
                if (data.error) {
                    console.log(data.error)
                } else {

                    updateUser(data, () => {

                        setUser({
                            ...user,
                            name: data.name,
                            email: data.email, 
                            success:true
                        })
                    })
                }
            }
        )

    }
    const redirectUser = (success)=>{

        if (success){
           return  <Redirect to='/cart'/>
        }
    }
    const profileUpdate = (name, email, password) => (

        <form>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input
                    type='text'
                    onChange={handleChange('name')}
                    className='form-control'
                    value={name}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input
                    type='email'
                    onChange={handleChange('email')}
                    className='form-control'
                    value={email}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input
                    type='password'
                    onChange={handleChange('password')}
                    className='form-control'
                    value={password}/>
            </div>
            <button onClick={clickSubmit} className='btn btn-primary'>Submit</button>
        </form>

    )
    return (
        <Layout
            title="Profile"
            description="Update Your Profile"
            ClassName="container-fluid">
            <h2 className="mb-4">Profile Update</h2>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}

        </Layout>
    )

}

export default Profile
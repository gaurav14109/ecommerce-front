import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom' 
import Signin  from './user/Signin'
import Signup  from './user/Signup'
import Home  from './core/Home'
import PrivateRoute from './user/PrivateRoute';
import AdminRoute from './user/AdminRoute';
import UserDashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCatergory'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManagerProducts'
import UpdateProduct from './admin/UpdateProduct'
import Orders from './admin/Orders'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import Profile from './user/Profile'
//BrowserRouter have props available to all routes in

const Routes = ()=>{
    
    return (

        <BrowserRouter>
      
            <Switch>    
                <Route path = "/" exact component={Home} />
                <Route path='/shop' exact component={Shop} />
                <Route path='/cart' exact component={Cart} />
                <PrivateRoute path = "/user/dashboard" exact component={UserDashboard} />
                <AdminRoute path = "/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path = "/create/category" exact component={AddCategory} />
                <AdminRoute path = "/admin/products" exact component={ManageProducts} />
                <AdminRoute path = "/admin/product/update/:productId" exact component={UpdateProduct} />
                <Route path='/profile/:userId' exact component={Profile}/>
                <Route path="/admin/orders" exact component={Orders} />
                {/* Private route are for authenticated route i.e dynamic route */}
                <AdminRoute path = "/create/product" exact component={AddProduct} />
                <Route path='/product/:productId' exact component={Product}/>
               
                <Route path = "/signin" exact component={Signin} />
                <Route path = "/signup" exact component={Signup} />
            </Switch>
        
        </BrowserRouter>
    )
//withRouter to access props history by default Router pass props to the called component
//which have some property
}

export default Routes;

//handling cart will be done at the client side

//Install braintree-web-drop-in react
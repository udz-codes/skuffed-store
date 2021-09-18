import React from 'react'
import Home from './core/Home.js'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import PrivateRoutes from './auth/helper/PrivateRoutes.js'
import Signup from './user/Signup.js'
import UserDashboard from './user/UserDashboard.js'
import Signin from './user/Signin.js'
import Cart from './core/Cart';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <PrivateRoutes path="/cart" exact component={Cart} />
                <PrivateRoutes path="/user/dashboard" exact component={UserDashboard}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;

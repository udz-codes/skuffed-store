import React, {Fragment} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/helper'

const currentTab = (history, path) => {
    if(history.location.pathname === path) {
        return {color: "#FFC107"}
    } else {
        return {color: "#FFFFFF"}
    }
}

const Menu = ({history, path}) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Skuffed Store</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-md-flex flex-md-row justify-content-md-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" to="/" style={currentTab(history, "/")}>Home</Link>
                            {
                                isAuthenticated() ?
                                <Fragment>
                                    <Link className="nav-link" to="/cart" style={currentTab(history, "/cart")}>Cart</Link>
                                    <Link className="nav-link" to="/user/dashboard" style={currentTab(history, "/user/dashboard")}>Dashboard</Link>
                                    <p className="nav-link text-danger m-0" onClick={() => {
                                        signout(() => {
                                            history.push("/");
                                        })
                                    }} style={{cursor: "pointer"}}>Logout</p>
                                </Fragment>
                                : <Fragment>
                                    <Link className="nav-link" to="/signup" style={currentTab(history, "/signup")}>Signup</Link>
                                    <Link className="nav-link" to="/signin" style={currentTab(history, "/signin")}>Login</Link>
                                </Fragment>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default withRouter(Menu)
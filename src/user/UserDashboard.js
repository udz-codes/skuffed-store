import React, { useState, useEffect, Fragment } from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getOrders, getUser } from './helper/userApiCalls';

const UserDashboard = () => {

    const [orders, setOrders] = useState([])
    const [error, setError] = useState(false)
    const user = isAuthenticated().user.email

    const orderHandler = async () => {
        await getOrders()
            .then(data => {
                setOrders(data)
            })
            .catch(err => {
                setError(err)
                console.log(error)
            })
    }

    useEffect(() => {
        orderHandler();
    }, [])

    return (
        <Base title="User dashboard" description="Placed orders">
            <div className="col-12 d-flex flex-column justify-content-evenly align-items-center flex-wrap">
                {
                    orders.length !== 0 && orders.map((item, index) => {
                        if (item.email === user) {
                            return (
                                <div className="col-12 col-sm-6" key={index}>
                                <table className="table table-bordered border-warning mb-4 text-light" >
                                    <tbody>
                                        <tr className="bg-warning text-dark border-dark">
                                            <th scope="row">Title</th>
                                            <th>Info</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">Products</th>
                                            <td>{item.product_names}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Number of products</th>
                                            <td>{item.total_products}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Total Amount</th>
                                            <td>${item.total_amount}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Delivery address</th>
                                            <td>{item.address}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </Base>
    )
}

export default UserDashboard;

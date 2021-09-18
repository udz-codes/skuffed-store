import React, { useState } from 'react'
import ImageHelper from './helper/imageHelper';
import {Redirect} from 'react-router-dom'
import { additemToCart, removeItemFromCart } from './helper/cartHelper';
import {isAuthenticated} from '../auth/helper'

const Card = ({
    props,
    addToCartToggle = true,
    removeFromCartToggle = false,
    reload = undefined,
    setReload = f => f,
}) => {

    const [redirect, setRedirect] = useState(false)
    const [goToSignin, setGoToSignin] = useState(false)


    const cardTitle = props ? props.name : "Product title"
    const cardDescription = props ? props.description : "Product Description"
    const cardPrice = props ? props.price : "0"

    const addToCart = () => {
        if (isAuthenticated()) {
            additemToCart(props, () => setRedirect(true))
            console.log("Added to cart")
        } else {
            console.log("Login please")
            // setGoToSignin(true);
        }
    }

    const getRedirect = (redirect) => {
        if(redirect) return <Redirect to="/cart"/>
    }

    const getLogin = (redirect) => {
        if(redirect) return <Redirect to="/signin"/>
    }

    const showAddToCart = addToCartToggle => {
        return (
            addToCartToggle && (
                <button
                    onClick={addToCart}
                    className="col-12 btn btn-sm btn-outline-primary rounded-pill"
                >
                    Add to Cart and Checkout
                </button>
            ) 
        )
    }

    const showRemoveFromCart = removeFromCartToggle => {
        return (
            removeFromCartToggle && (
                <button
                    onClick={() => {
                        // TODO: Handle this too
                        removeItemFromCart(props.id);
                        setReload(!reload);

                        console.log("Product removed from cart")
                    }}
                    className="col-12 btn btn-sm btn-outline-danger rounded-pill"
                >
                    Remove from cart
                </button>
            ) 
        )
    }

    return (
      <div className="card text-dark shadow-lg" style={{borderRadius: "1em"}}>
        <div className="card-body p-0">
            <div className="d-flex flex-row justify-content-end">
                <button
                    className="m-2 p-1 btn btn-warning rounded-circle text-dark shadow-sm d-flex flex-row justify-content-center align-items-center"
                    style={{position: 'absolute', height: '4vh', width: '4vh'}}
                    data-bs-toggle="modal" data-bs-target={"#imageModal" + props.id}
                ><i class="fas fa-expand"></i>
                </button>
            </div>
            <div style={{height:"30vh"}}>
                <ImageHelper item={props} />
            </div>
            <div className="col-12 p-3">
                <h6 className= "mb-1" style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>{cardTitle}</h6>
                <p
                    className="font-weight-normal text-muted mb-1"
                    style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontSize: "clamp(0.8rem, 2.5vw, 0.8rem)"}}
                >
                    {cardDescription}
                </p>
                <p className="text-success h6   ">$ {cardPrice}</p>
                <div className="col-12">
                    {showAddToCart(addToCartToggle)}
                </div>
                <div className="col-12">
                    {showRemoveFromCart(removeFromCartToggle)}
                </div>
            </div>
            <div className="modal fade" id={"imageModal" + props.id} tabIndex="-1" aria-labelledby={"imageModalLabel" + props.id} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{backgroundColor: "#ffffff00"}}>
                        <div className="d-flex flex-row justify-content-end">
                            <button type="button"
                                className="m-2 btn btn-warning rounded-circle text-dark shadow-sm d-flex flex-row justify-content-center align-items-center"
                                style={{position: 'absolute', height: '4vh', width: '4vh', zIndex: 99}}
                                data-bs-dismiss="modal" aria-label="Close"
                            ><i class="fas fa-times"></i></button>
                        </div>
                        <div className="modal-body p-0 d-flex flex-column justify-content0-between">
                            <div style={{height:"70vh"}}>
                                <ImageHelper item={props} />
                            </div>
                            <div className="text-dark p-3 mt-2 bg-light" style={{borderRadius: "1em"}}>
                                <h4>{cardTitle}</h4>
                                <p className="p-0 m-0">{cardDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {getRedirect(redirect)}
        {/* {getLogin(goToSignin)} */}
      </div>
    );
};

export default Card

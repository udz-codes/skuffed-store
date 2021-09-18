import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { cartEmpty } from "./helper/cartHelper";
import { getMeToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated, signout } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({
    products,
    reload = undefined,
    setReload = (f) => f,
}) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
    });

    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")

    const userId = isAuthenticated && isAuthenticated().user.id;
    const token = isAuthenticated && isAuthenticated().token;

    const addressHandler = (value) => setAddress(value);
    const phoneHandler = (value) => setPhone(value);

    const getToken = (userId, token) => {
        getMeToken(userId, token)
            .then((info) => {
                if (info.error) {
                    setInfo({
                        ...info,
                        error: info.error,
                    });
                    signout(() => {
                        return <Redirect to="/" />;
                    });
                } else {
                    const clientToken = info.clientToken;
                    setInfo({ clientToken });
                }
            });
    };

    useEffect(() => {
        getToken(userId, token);
    }, [reload]);

    const getAmount = () => {
        let amount = 0;
        products.map((p) => {
            amount = amount + parseInt(p.price);
        });
        return amount;
    };

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        
        info.instance.requestPaymentMethod().then((data) => {
            // console.log("MYDATA", data);
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount(),
            };
            processPayment(userId, token, paymentData)
            .then((response) => {
                // console.log("POINT-1", response);
                if (response.error) {
                    if (response.code === "1") {
                        // console.log("PAYMENT Failed!");
                        signout(() => {
                            return <Redirect to="/" />;
                        });
                    }
                } else {
                    setInfo({ ...info, success: response.success, loading: false });
                    // console.log("PAYMENT SUCCESS");

                    let product_names = "";
                    products.forEach(function (item) {
                        product_names += item.name + ", ";
                    });

                    const orderData = {
                        products: product_names,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount,
                        address: address,
                        phone: phone
                    };
                    
                    createOrder(userId, token, orderData)
                        .then((response) => {
                            if (response.error) {
                                if (response.code === "1") {
                                    // console.log("Order Failed!");
                                    signout(() => {
                                        return <Redirect to="/" />;
                                    });
                                }
                            } else {
                                if (response.success === true) {
                                    console.log("ORDER PLACED!!");
                                    return <Redirect to="/" />;
                                }
                            }
                        })
                        .catch((error) => {
                            setInfo({ loading: false, success: false });
                            console.log("Order FAILED", error);
                        });

                    cartEmpty(() => {
                        console.log("Did we get a crash?");
                    });

                    setReload(!reload);
                }
            })
            .catch((error) => {
                setInfo({ loading: false, success: false });
                console.log("PAYMENT FAILED", error);
            });
        });
    };

    const showbtnDropIn = () => {
        return (
            <div>
                {info.clientToken !== null && products.length > 0
                    ? (
                        <div>
                            <DropIn
                                options={{ authorization: info.clientToken }}
                                onInstance={(instance) => (info.instance = instance)}
                            >
                            </DropIn>
                            <button
                                onClick={onPurchase}
                                className="btn form-control btn-warning"
                            >
                                Buy Now
                            </button>
                        </div>
                    )
                    : (
                        <h3>Please login first or add something in cart</h3>
                    )}
            </div>
        );
    };

    return (
        <div className="d-flex flex-column">
            <h3>Your bill is $ {getAmount()}</h3>
            <input type="text" onChange={(event) => addressHandler(event.target.value)} className="form-control mb-3" value={address} placeholder="Delivery address" />
            <input type="text" onChange={(event) => phoneHandler(event.target.value)} className="form-control" value={phone} placeholder="Contact number (without country code)" maxLength="10" />
            {showbtnDropIn()}
        </div>
    );
};

export default PaymentB;

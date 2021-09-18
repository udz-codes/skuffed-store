import React, {useState, useEffect} from 'react'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import PaymentB from './PaymentB'

const Cart = () => {

    const [reload, setReload] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProducts = (products) => {
        return (
            <div className="d-flex flex-column flex-md-row align-items-center flex-wrap">
                {
                    
                    products && products.map((product, index) => {  
                        return (
                            <div className="col-10 col-md-4 m-2">
                                <Card
                                    key={index}
                                    props={product}
                                    removeFromCartToggle={true}
                                    addToCartToggle={false}
                                    reload={reload}
                                    setReload={setReload}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <div>
                {
                    products.length > 0 ? (
                        <PaymentB products={products} setReload={setReload}/>
                    ) : (
                        <h3>Please login or add something in the cart</h3>
                    )
                }
            </div>
        )
    }

    return (
        <Base title="Cart" description="Welcome to checkout">
            <div className="d-flex flex-column flex-md-row justify-content-between text-center">
                <div className="col-12 col-md-6">{loadAllProducts(products)}</div>
                <div className="col-12 col-md-4 mt-4 mt-sm-0">{loadCheckout()}</div>
            </div>
        </Base>
    )
}

export default Cart;
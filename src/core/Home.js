import React, {useState, useEffect, Fragment} from 'react'
import { getProducts } from './helper/coreApiCalls'
import Base from './Base'
import Card from './Card'

export default function Home() {
    
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const prodHandler = () => {
        getProducts()
        .then(data => {
            setProducts(data)
        })
        .catch(err => {
            setError(err)
            console.log(error)
        })

        console.log(products)
    }

    useEffect(() => {
        prodHandler();
    }, [])

    return (
        <Base
            title="Home Page"
            description="Welcome to skuffed store"
        >
            <div className="col-12 d-flex flex-row justify-content-evenly flex-wrap">
                {
                    products.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <div className="col-10 col-sm-2 mb-4 mx-4" >
                                    <Card props={item}/>
                                </div>
                            </Fragment>
                        )
                    })
                }
            </div>
        </Base>
    )
}
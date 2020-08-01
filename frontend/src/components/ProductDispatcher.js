import React, { Fragment } from 'react'
import Product from "./Products"

export default function ProductDispatcher({products}) {
    return (
        
                        <Fragment>
                            {products.map(item => {

                                return item && <Product key={item._id} item={item} />

                            }
                            )}
                            </Fragment>
                        
    )
}

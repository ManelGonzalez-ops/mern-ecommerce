import React, { useEffect, useState, Fragment } from 'react';

import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { listProducts } from '../actions/productActions';


function App() {
    const [productoSeleccion, setProductoSeleccion] = useState("")
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userSignin)
    const userRegister = useSelector(state => state.userSignup)

    useEffect(() => {
            dispatch(listProducts())

    }, [])


    return (

        <Fragment>
            <div>HOLA</div>
                    {loading ? <p>loading...</p>
                        :
                        error ? <p>{error}</p>
                            :
                            <div className="App">
                                {products.map(item => <li key={item._id}><Link to={`/product/${item._id}/`}>{item.name}</Link></li>)}
                            </div>
                    }
              
              </Fragment>
    );
}

export default App;

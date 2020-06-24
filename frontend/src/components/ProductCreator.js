import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { saveProduct, listProducts } from "../actions/productActions"
import Cookie from "js-cookie"

export default function Users(props) {

    const [openModal, setOpenModal] = useState(false)
    const [openModalDel, setOpenModalDel] = useState(false)
    const signin = useRef(null)
    const dispatch = useDispatch()
    const productCreator = useSelector((state) => state.productCreate)

    const { saveLoading, success, saveError } = productCreator

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [brand, setBrand] = useState("")
    const [image, setImage] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState("")
    const [description, setDescription] = useState("")
    const [_id, setId] = useState("")

    const history = useHistory()

    const handleInput = (e) => {
        const { name, value } = e.target
        switch (name) {
            case "name":
                setName(value)
                return
            case "image":
                setImage(value)
                return
            case "price":
                setPrice(value)
                return
            case "brand":
                setBrand(value)
                return
            case "category":
                setCategory(value)
                return
            case "stock":
                setStock(value)
                return
            case "description":
                setDescription(value)
                return
        }
    }

    const handleCreateorEdit = (e) => {
        e.preventDefault()
        console.log(e.target.textContent)
        switch (signin.current.textContent) {
            case "Create":
                console.log("hola")
                dispatch(saveProduct({ name, image, price, brand, description, category, stock }))
                return
            case "Update":
                console.log(_id)
                dispatch(saveProduct({ _id, name, image, price, brand, description, category, stock }))
        }
        
    }


    const productLista = useSelector(state => state.productList)
    const { products, loading, error } = productLista




    useEffect(() => {

        if (!saveLoading && success) {
            //we make the app rererender to show the new product (we'll a ajax call)
            // window.location.href = 'http://localhost:3000'
            dispatch(listProducts())

        }
//if appRedux rerenders in the background will call this effect.. because succes will change, but that's not how it should so we add a useffect [] a continuacion
    }, [success])

    useEffect(()=>{
        dispatch(listProducts())
    }, [])


    const createProduct = () => {
        setOpenModal(true)
        signin.current.textContent = "Create"
    }

    const editProduct = (product) => {
        if (!openModal) {
            setOpenModal(true)
        }
        setId(product._id)
        setName(product.name)
        setPrice(product.price)
        setBrand(product.brand)
        setCategory(product.category)
        setImage(product.image)
        setDescription(product.description)
        setStock(product.stock)
        signin.current.textContent = "Update"
    }
const deleteProduct =(e)=>{
    
    dispatch(saveProduct({_id, delete: true}))
    e.preventDefault()
}
    const deleteProductPre = (id) => {
        setOpenModalDel(true)
        setId(id)
    }

    return (
        <Fragment>

            <button
                onClick={createProduct}

            >Create product</button>


            {saveLoading && <p>oading ...</p>}
            <p>{saveError && saveError}</p>
            <a href="/cart/">Cart</a>


            <div className="form-container"
                className={openModal ? "modal open" : "modal"}>
                <button onClick={() => { setOpenModal(false) }}>close</button>
        {/* creates and edits */}
                <form method="POST" onSubmit={handleCreateorEdit}
                >
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input id="name" type="text" name="name" value={name} onChange={(e) => { handleInput(e) }}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <input id="image" type="text" name="image" value={image} onChange={(e) => { handleInput(e) }}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input id="price" type="number" name="price" value={price} onChange={(e) => { handleInput(e) }}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="brand">Brand</label>
                        <input id="brand" type="text" name="brand" value={brand} onChange={(e) => { handleInput(e) }}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input id="category" type="text" name="category" value={category} onChange={(e) => { handleInput(e) }}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripcion</label>
                        <textarea id="description" name="description" value={description} onChange={(e) => { handleInput(e) }}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock">Count in stock</label>
                        <input id="stock" type="name" name="stock" value={stock} onChange={(e) => { handleInput(e) }}></input>
                    </div>
                    <button type="submit" ref={signin}>Signin</button>
                </form>
            </div>
            <br /><br />
            <div className="product-list">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {products && products.length &&
                    <table>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Stock</th>
                        </tr>
                        </thead>
                        <tbody>     
                        {products.map(item => <tr key={item._id}>
                            <th>{item._id}</th>
                            <td>{item.name}</td>
                            <td>{item.image}</td>
                            <td>{item.brand}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>{item.description}</td>
                            <td>{item.stock}</td>
                            <td>
                                <button onClick={() => { editProduct(item) }}>
                                    EditProduct
                        </button>
                                <button onClick={() => { deleteProductPre(item._id) }}>
                                    DelteProduct
                        </button>
                            </td>
                        </tr>)}
                        </tbody>

                    </table>}

                <div
                id="modal-delete"
                 className={openModalDel? "modal open": "modal"}>
                    Are you sure you want to remove the product ?
                    <button onClick={deleteProduct}>Remove</button>
                    <button onClick={()=>{setOpenModalDel(false)}}>Cancel</button>

                </div>
            </div>
        </Fragment>
    )
}

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
    const [category, setCategory] = useState("Software")
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
       
        switch (signin.current.textContent) {
            case "Create":
            
                dispatch(saveProduct({ name, image, price, brand, description, category, stock }))
                return
            case "Update":
          
                dispatch(saveProduct({ _id, name, image, price, brand, description, category, stock }))
        }
        
    }


    const productLista = useSelector(state => state.productList)
    const { products, loading, error } = productLista

    const categoryList = ["Toys", "Hardware", "Accesories", "Kitchen & Dining",  "Clothing & Jewelry", "Books", "Baby", "Sports", "Other"]




    useEffect(() => {

        if (!saveLoading && success) {
            //we make the app rererender to show the new product (we'll a ajax call)
            // window.location.href = 'http://localhost:3000'
            dispatch(listProducts())

        }
//if appRedux rerenders in the background will call this effect.. because succes will change, but that's not how it should so we add a useffect [] a continuacion
    }, [success])

    useEffect(()=>{
        dispatch({type:"SET_CURRENT_PATH", payload: "hide"})
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
        <div className="admin-wrapper">

            <button className="button-pnp"
                onClick={createProduct}

            >Create product</button>


            {saveLoading && <p>oading ...</p>}
            <p>{saveError && saveError}</p>
            


            <div className="form-container"
                className={openModal ? "modal open" : "modal"}>
                
        {/* creates and edits */}
                <form className="form form-signup" method="POST" onSubmit={handleCreateorEdit}
                >   <div className="form-responsive-section">
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input id="name" type="text" name="name" value={name} onChange={(e) => { handleInput(e) }} required ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <input id="image" pattern="https://.*" type="url" name="image" value={image} onChange={(e) => { handleInput(e) }} pattern="https://.*" placeholder="https://..." required ></input>
                    </div>
                    </div>
                    <div className="form-responsive-section">
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input id="price" type="number" name="price" value={price} onChange={(e) => { handleInput(e) }} required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="brand">Brand</label>
                        <input id="brand" type="text" name="brand" value={brand} onChange={(e) => { handleInput(e) }} required></input>
                    </div>
                    </div>
                    <div className="form-responsive-section">
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select id="category" type="text" name="category" value={category} onChange={(e) => { handleInput(e) }} required>
                        {categoryList.map((item,index)=>
                            <option value={item} key={index}>{item}</option>)}
                            
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripcion</label>
                        <textarea id="description" name="description" value={description} onChange={(e) => { handleInput(e) }} required></textarea>
                    </div>
                    </div>
                    <div className="form-group stock-field">
                        <label htmlFor="stock">Count in stock</label>
                        <input  id="stock" type="number" name="stock" value={stock} onChange={(e) => { handleInput(e) }} required></input>
                    </div>
                    <button type="submit" className="button-pnp create" ref={signin}>Signin</button>
                    <button onClick={() => { setOpenModal(false) }}>close</button>
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
        </div>
    )
}

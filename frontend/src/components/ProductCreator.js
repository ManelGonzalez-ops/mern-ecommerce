import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { saveProduct, listProducts } from "../actions/productActions"
import { Box, Button, FormControl, InputLabel, makeStyles, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    batonpnp: {
        display: "block",
        margin: "0 auto",
        marginTop: "3rem"
    }
}))
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

    const categoryList = ["Toys", "Hardware", "Accesories", "Kitchen & Dining", "Clothing & Jewelry", "Books", "Baby", "Sports", "Other"]




    useEffect(() => {

        if (!saveLoading && success) {
            //we make the app rererender to show the new product (we'll a ajax call)
            // window.location.href = 'http://localhost:3000'
            dispatch(listProducts())

        }
        //if appRedux rerenders in the background will call this effect.. because succes will change, but that's not how it should so we add a useffect [] a continuacion
    }, [success])

    useEffect(() => {
        dispatch({ type: "SET_CURRENT_PATH", payload: "hide" })
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
    const deleteProduct = (e) => {

        dispatch(saveProduct({ _id, delete: true }))
        e.preventDefault()
    }
    const deleteProductPre = (id) => {
        setOpenModalDel(true)
        setId(id)
    }
    const clases = useStyles()
    return (
        <div className="admin-wrapper">

            <Button
                classes={{ root: clases.batonpnp }}
                variant="contained" color="primary"
                onClick={createProduct}

            >Create product</Button>


            {saveLoading && <p>Loading ...</p>}
            <p>{saveError && saveError}</p>



            <div className="form-container"
                className={openModal ? "modal open" : "modal"}>

                {/* creates and edits */}
                <Paper component="form" className="form form-signup" method="POST" onSubmit={handleCreateorEdit}
                >   <div className="form-responsive-section">
                        <div className="form-group">
                            <TextField
                                id="name"
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => { handleInput(e) }}
                                label="Product Name"
                                required />
                        </div>
                        <div className="form-group">
                            <TextField
                                id="image"
                                type="url"
                                name="image"
                                value={image}
                                onChange={(e) => { handleInput(e) }}
                                pattern="https://.*"
                                placeholder="https://..."
                                label="image"
                                required />
                        </div>
                    </div>
                    <div className="form-responsive-section">
                        <div className="form-group">
                            <TextField
                                id="price"
                                type="number"
                                name="price"
                                value={price}
                                onChange={(e) => { handleInput(e) }}
                                label="Price"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                id="brand"
                                type="text"
                                name="brand"
                                value={brand}
                                label="brand"
                                onChange={(e) => { handleInput(e) }}
                                required />
                        </div>
                    </div>
                    <div className="form-responsive-section">
                        <div className="form-group">
                            <FormControl
                            style={{width: "300px"}}
                            >
                                <InputLabel id="category">category</InputLabel>
                                <Select
                                id="category"
                                labelId="label"
                                type="text"
                                name="category"
                                value={category}
                                onChange={(e) => { handleInput(e) }}
                                label="category"
                                style={{width: "100%"}}
                                required>
                                {categoryList.map((item, index) =>
                                    <option value={item} key={index}>{item}</option>)}

                            </Select>
                            </FormControl>
                            
                        </div>
                        <div className="form-group">
                            <TextField
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => { handleInput(e) }}
                                label="description"
                                
                                required
                                //variant="outlined"
                                // multiline
                                // rows={4}
                            />
                        </div>
                    </div>
                    <div className="form-group stock-field">

                        <TextField
                            id="stock"
                            type="number"
                            name="stock"
                            value={stock}
                            onChange={(e) => { handleInput(e) }}
                            label="units in stock"
                            required></TextField>
                    </div>
                    <Button
                        type="submit"
                        className="button-pnp create"
                        ref={signin}
                        variant="contained"
                        color="primary"
                    >Signin</Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => { setOpenModal(false) }}
                    >close</Button>
                </Paper>
            </div>
            <br /><br />
            <div className="product-list">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {products && products.length &&
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell align="right">id</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Brand</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Category</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right">Stock</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map(item => <TableRow key={item._id}>
                                    <TableCell align="right" component="th" scope="row" >{item._id}</TableCell>
                                    <TableCell align="right">{item.name}</TableCell>
                                    <TableCell align="right">{item.brand}</TableCell>
                                    <TableCell align="right">{item.price}</TableCell>
                                    <TableCell align="right">{item.category}</TableCell>
                                    <TableCell align="right">{item.description}</TableCell>
                                    <TableCell align="right">{item.stock}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => { editProduct(item) }}>
                                            EditProduct
                        </Button>
                                        <Button onClick={() => { deleteProductPre(item._id) }}>
                                            DelteProduct
                        </Button>
                                    </TableCell>
                                </TableRow>)}
                            </TableBody>

                        </Table>
                    </TableContainer>}

                <Box
                    id="modal-delete"
                    className={openModalDel ? "modal open" : "modal"}>
                    Are you sure you want to remove the product ?
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={deleteProduct}>Remove</Button>
                    <Button
                        variant="outlined"
                        color=""
                        onClick={() => { setOpenModalDel(false) }}>Cancel</Button>

                </Box>
            </div>
        </div>
    )
}

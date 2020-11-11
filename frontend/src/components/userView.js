import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { userUpdateInfo } from "../actions/userActions"
import { Link } from "react-router-dom"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'

export default function UserView() {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [rpassword, setRpassword] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState({ error: false, msg: "" })
    const [orders, setOrders] = useState([])

    const { userInfo, error, loading } = useSelector(state => state.userSignin)

    const handleInput = (e) => {
        const { name, value } = e.target
        switch (name) {
            case "email":
                setEmail(value)
                return
            case "name":
                setName(value)
                return
            case "password":
                setPassword(value)
                return
            case "rpassword":
                setRpassword(value)
                return
        }
    }

    const dispatch = useDispatch()

    const handleUserUpdate = (e) => {

        e.preventDefault()
        if (password === rpassword) {

            dispatch(userUpdateInfo({ email, name, password }))
        }

    }



    useEffect(() => {

        const fecharOrder = async () => {
            try {

                const rawData =
                    await fetch(`http://nodeecommerce.herokuapp.com/orders/completed/${userInfo._id}`, {
                        headers: {
                            "Authorization": `Bearer ${userInfo}`
                        }
                    })
                const { data } = await rawData.json()
                setOrders(data)
                setIsLoading(false)
            }
            catch (err) {
                setIsLoading(false)
                setIsError({ error: true, msg: err.message })
            }

        }

        fecharOrder()

    }, [])

    return (

        <div className="userView-wrapper">

            <Paper component="form" method="POST" className="form update-form userView" onSubmit={handleUserUpdate}>
                <Typography variant="h4" className="form-title">Update Account</Typography>
                <div className="form-group">
                    <TextField
                        id="email"
                        type="email"
                        label="email"
                        variant="outlined"
                        name="email"
                        value={email}
                        onChange={(e) => { handleInput(e) }}
                        required
                        fullWidth />
                </div>
                <div className="form-group">
                   
                    <TextField
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => { handleInput(e) }}
                        label="name"
                        variant="outlined"
                        required
                        fullWidth />
                </div>


                <div className="form-group">
                  
                    <TextField
                     id="password" 
                     type="password"
                      name="password" 
                      value={password}
                       onChange={(e) => { handleInput(e) }}
                       label="password"
                       variant="outlined"
                        required
                        fullWidth 
                        />
                </div>
                <div className="form-group">
                    
                    <TextField 
                    id="password" 
                    type="password" 
                    name="rpassword" 
                    value={rpassword} 
                    onChange={(e) => { handleInput(e) }}
                    label="confirm password"
                    variant="outlined"
                    required
                    fullWidth />
                </div>

                <Button 
                
                 type="submit"
                 variant="contained"
                 color="primary"
                 >Update Account</Button>
                <Typography className="placeholder-user">Logout ?</Typography>
                <Button 
                variant="contained"
                color="secondary"
                >Log Out</Button>
            </Paper>
            <TableContainer
            style={{width: "auto", flex: 1}}
            >
            <Table 
            //id="table-costumer"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Order Id</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>See Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? <div>loading...</div>
                        :
                        isError.error ? <div>{isError.msg}</div>
                            :
                            orders && orders.userOrders.length > 0? orders.userOrders.map(order =>
                                <TableRow key={order._id}>
                                    <TableCell component="th" scope="row">{order._id}</TableCell>
                                    <TableCell>{orders.user.name}</TableCell>
                                    <TableCell>{order.totalCost}</TableCell>
                                    <TableCell>{order.dateAdded}</TableCell>
                                    <TableCell><Link to={`/order/${order._id}`}>details</Link></TableCell>
                                </TableRow>)
                            :
                            <TableCell colSpan={4}>You have no orders with us yet !</TableCell>    
                            }

                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}

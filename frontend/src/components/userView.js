import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { userUpdateInfo } from "../actions/userActions"
import { Link } from "react-router-dom"

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

            <form method="POST" className="form update-form" onSubmit={handleUserUpdate}>
                <h1 className="form-title">Update Account</h1>
                <div className="form-group">
                    <label htmlFor="email"><span className="tag-color1">new</span> Email</label>
                    <input id="email" type="email" name="email" value={email} onChange={(e) => { handleInput(e) }} required />
                </div>
                <div className="form-group">
                    <label htmlFor="name"><span className="tag-color2">new</span> Name</label>
                    <input id="name" type="text" name="name" value={name} onChange={(e) => { handleInput(e) }} required />
                </div>


                <div className="form-group">
                    <label htmlFor="password"><span className="tag-color3">new</span> Password</label>
                    <input id="password" type="password" name="password" value={password} onChange={(e) => { handleInput(e) }} required />
                </div>
                <div className="form-group">
                    <label htmlFor="rpassword">Confirm <span className="tag-color3">new</span> Password</label>
                    <input id="rpassword" type="password" name="rpassword" value={rpassword} onChange={(e) => { handleInput(e) }} required />
                </div>

                <button className="button-pnp" type="submit">Update Account</button>
                <p className="placeholder-user">Logout ?</p>
                <button className="button-pnp" >Log Out</button>
            </form>
            <table id="table-costumer">
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total Price</th>
                        <th>See Details</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <div>loading...</div>
                        :
                        isError.error ? <div>{error.msg}</div>
                            :
                            orders && orders.userOrders && orders.userOrders.map(order =>
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{orders.user.name}</td>
                                    <td>{order.totalCost}</td>
                                    <td>{order.dateAdded}</td>
                                    <td><Link to={`/order/${order._id}`}>details</Link></td>
                                </tr>)}

                </tbody>
            </table>
        </div>
    )
}

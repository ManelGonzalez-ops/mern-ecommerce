import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Cookie from "js-cookie"
import { userLogout } from "../actions/userActions"

export default function Nav() {

    const [openDropdown, setOpenDropdown] = useState(false)
    const [movileMenu, setMovileMenu] = useState(false)


    const { userInfo } = useSelector(state => state.userSignin)

    const dispatch = useDispatch()
    const logout = () => {
        dispatch(userLogout())
    }







    const MovileDropdown = () =>

        <ul className="movile-dropdown open">
            <li className="dropdown-list-item arrow"
                onClick={() => { setMovileMenu(false) }}
            ><strong>&#8594;</strong></li>
            <li className="dropdown-list-item"><Link to="/user">Profile</Link></li>
            <li className="dropdown-list-item"
                onClick={logout}>Log out</li>
            <li className="dropdown-list-item"><Link to="/addstore">Admin section</Link></li>
        </ul>




    return (
        <header>
            <a className="logo">Amazon shop</a>
            <span onClick={() => { setMovileMenu(true) }}>
                <svg viewBox="0 0 18 15" height="40px" width="40px" className={movileMenu ? "burger close" : "burger"}>
                    <path fill="#424242" d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.031C17.335,0,18,0.665,18,1.484L18,1.484z" />
                    <path fill="#424242" d="M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0c0-0.82,0.665-1.484,1.484-1.484 h15.031C17.335,6.031,18,6.696,18,7.516L18,7.516z" />
                    <path fill="#424242" d="M18,13.516C18,14.335,17.335,15,16.516,15H1.484C0.665,15,0,14.335,0,13.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.031C17.335,12.031,18,12.696,18,13.516L18,13.516z" />
                </svg>
            </span>
            <nav>
                <ul className="nav-list">
                    <li className="nav-item"><Link to="/">Shop</Link></li>
                    <li className="nav-item"><Link to="/cart">Cart</Link></li>
                    {userInfo ?

                        <li className="nav-item dropdown"
                            onMouseOver={() => { setOpenDropdown(prev => !prev) }}
                            onMouseOut={() => { setOpenDropdown(prev => !prev) }}>
                            Account
                            <ul className={openDropdown ? "dropdown-list open" : "dropdown-list "}>
                                <li className="dropdown-list-item"><Link to="/user">Profile</Link></li>
                                <li className="dropdown-list-item"
                                    onClick={logout}>Log out</li>
                                <li className="dropdown-list-item"><Link to="/addstore">Admin section</Link></li>
                            </ul>
                        </li>

                        :

                        <li className="nav-item"><Link to="/signin">Signin</Link></li>}

                </ul>

            </nav>
            {movileMenu && <MovileDropdown />}
        </header>
    )
}




export const CloseBtn = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" /></svg>


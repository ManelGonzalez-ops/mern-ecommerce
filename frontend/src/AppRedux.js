import React, { useEffect, useState, Fragment } from 'react';
import './App.css';
// import Products from "./data"
import DetailsRedux from "./components/DetailsRedux"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import Nav from "./components/Nav"
import Cart from "./components/Cart"
import Signin from "./components/Signin"
import Signup from "./components/Signup"
import ProductCreator from "./components/ProductCreator"
import Hall from "./components/Hall"

function App() {
    const [productoSeleccion, setProductoSeleccion] = useState("")


    return (

        <Router>
            <Nav />

            <Switch>
                <Route path="/product/:productId" exact component={DetailsRedux} />
            </Switch>
            <Switch>
                <Route path="/cart/:productId?" exact component={Cart} />
            </Switch>
            <Switch>
                <Route path="/addstore" exact component={ProductCreator} />
            </Switch>
            <Switch>
                <Route path="/signin" exact component={Signin} />
            </Switch>
            <Switch>
                <Route path="/signup" exact component={Signup} />
            </Switch>
            <Switch>
                <Route path="/store" exact component={Signup} />
            </Switch>
            
            <Switch>
                <Route path="/" exact component={Hall}>
                </Route>
            </Switch>

        </Router>

    );
}

export default App;

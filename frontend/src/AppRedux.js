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
import Shipping from "./components/Shipping"
import Checkout from "./components/Checkout"
import StepTimeline from "./components/StepTimeline"
import { useSelector, useDispatch } from "react-redux"
import UserView from "./components/userView"
import OrderDetails from "./components/OrderDetails"



function App() {
    const [productoSeleccion, setProductoSeleccion] = useState("")


//tenemos que renderizar dodicionalmente StepTimeline

const {currentPath} = useSelector(state=>state.currentPath)

useEffect(()=>{

}, [currentPath])

const Timeline =()=>{
    if(JSON.parse(localStorage.getItem("isbuyin"))){

        if("path" == "login or logout"){
            return <Route path="/" component={StepTimeline}/>
        }
    }
    else if("path" == "checkoout or shipping") {
            return <Route path="/" component={StepTimeline}/>
    }
}

    return (

        <Router>
            <Nav />
            
                {currentPath === "show" && <Route path="/" component={StepTimeline}/>}
                
                <Route path="/shipping" exact component={Shipping} />

                <Route path="/signin" exact component={Signin} />
            
                <Route path="/signup" exact component={Signup} />
           
                <Route path="/checkout" exact component={Checkout} />
            
            <Switch>
                <Route path="/product/:productId" exact component={DetailsRedux} />
            </Switch>
            <Switch>
                <Route path="/user" exact component={UserView} />
            </Switch>
            <Switch>
                <Route path="/order/:id" exact component={OrderDetails} />
            </Switch>
            <Switch>
                <Route path="/cart/:productId?" exact component={Cart} />
            </Switch>
            <Switch>
                <Route path="/addstore" exact component={ProductCreator} />
            </Switch>
            <Switch>
                <Route path="/" exact component={Hall}>
                </Route>
            </Switch>
            <footer className="footer">
                All rights reserved	&copy;
            </footer>
        </Router>

    );
}

export default App;

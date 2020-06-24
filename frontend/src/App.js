import React from 'react';
import './App.css';
import Products from "./data"
import Details from "./components/Details"

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"

function App() {
  const { products } = Products
  return (
    <Router>
      <Switch>
        <Route path="/:details" exact component={Details} />
      </Switch>
      
      <Switch>
        <Route path="/" exact>
          <div className="App">
            {products.map(item => <li key={item._id}><Link to={item._id}>{item.name}</Link></li>)}
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
import Order from "./Order";
import ItemPage from './Item';
import "./Navbar.css";
import OrderEdit from "./OrderEdit";
import Print from './Print';

const Navbar = () => {


  return (

    <>
      <Router>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navcol">
          <a className="navbar-brand " href="#">WH PICK LIST</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse center" id="navbarSupportedContent">
            <ul className="navbar-nav center">
              <li className="nav-item">
                <NavLink activeClassName="active" to="/order" className="nav-link active">Order</NavLink>
              </li>
              <li className="nav-item ">
                <NavLink activeClassName="active" to="/item" className="nav-link active">Item</NavLink>
              </li>
              <li className="nav-item ">
                <NavLink activeClassName="active" to="/print" className="nav-link active">Print</NavLink>
              </li>
              <li className="nav-item ">
                <NavLink activeClassName="active" to="/orderedit" className="nav-link active">Order Edit</NavLink>
              </li>
              </ul>
          </div>
        </nav>

        {/* {Status && <div className="container"><Order /></div>}
            {Statuses && <div className="container"><Item /></div>} */}


        <Switch>
          <div className="container">
          <Route path="/order" component={Order} />
            <Route path="/item" component={ItemPage} />
            <Route exact path="/print" component={Print} />
            <Route exact path="/orderedit" component={OrderEdit} />
            <Route component="" />
          </div>
        </Switch>
      </Router>

    </>
  )
}

export default Navbar;
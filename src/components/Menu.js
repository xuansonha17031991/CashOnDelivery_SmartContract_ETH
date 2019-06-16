import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Menu extends Component {
    render() {
        return (
            <div>
                <nav>
                    <ui className="nav-links">
                        <NavLink activeStyle={{
                            fontWeight: "bold",
                            color: "red"
                        }} to='/home'>
                            <div><li>Seller creates</li></div>
                        </NavLink>
                        <NavLink activeStyle={{
                            fontWeight: "bold",
                            color: "red"
                        }} to='/review'>
                            <div><li>Buyer deposits</li> </div>
                        </NavLink>
                        <NavLink activeStyle={{
                            fontWeight: "bold",
                            color: "red"
                        }} to='/shipper'>
                            <div><li>Seller Creates To Transport</li> </div>
                        </NavLink>
                        <NavLink activeStyle={{
                            fontWeight: "bold",
                            color: "red"
                        }} to='/shipperdilivery'>
                            <div><li>Shipper Deposits</li> </div>
                        </NavLink>
                        <NavLink activeStyle={{
                            fontWeight: "bold",
                            color: "red"
                        }} to='/confirm'>
                            <div><li>Successful Confirm</li> </div>
                        </NavLink>
                        <NavLink activeStyle={{
                            fontWeight: "bold",
                            color: "red"
                        }} to='/confirmerrbyship'>
                            <div><li>Confirm Error By Shipper</li> </div>
                        </NavLink>
                        <NavLink activeStyle={{
                            fontWeight: "bold",
                            color: "red"
                        }} to='/confirmerrbybuyer'>
                            <div><li>Confirm Error By Buyer</li> </div>
                        </NavLink>
                        
                    </ui>
                </nav>
            </div>
        );
    }
}

export default Menu;
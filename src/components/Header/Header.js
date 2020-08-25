import React from 'react';
import logo from '../../images/logo.png';
import './Header.css'

const h1 = () => {
    return (
        <div className="header"> 
            <img src={logo} alt="" />
            <nav >
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/manage">Manage Inventory</a>
            </nav>
        </div>
    );
};

export default h1;
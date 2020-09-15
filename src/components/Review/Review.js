import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced ,setOrderPlaced] = useState(false);
    const history = useHistory()
    
    // clicked place order 
    
    const handleProceedCheckout = () =>{
         
        history.push('/shipment');
        
    }

    // remove item 
    const removeItem = (productkey) => {

        const newCart = cart.filter(pd => pd.key !== productkey);
        setCart(newCart);
        removeFromDatabaseCart(productkey);
    }
    useEffect(() => {
        // Cart to take date
        const savedCart = getDatabaseCart();
        const productkeys = Object.keys(savedCart);

        const cartProducts = productkeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key]
            return product;

        })

        setCart(cartProducts);
    },[]);
    let thankyou ;
    if(orderPlaced)
    {
        thankyou = <img src={happyImage} alt=""/>
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem key={pd.key} removeItem={removeItem} product={pd}></ReviewItem>)
                }
                {thankyou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>

        </div>
    );
};

export default Review;
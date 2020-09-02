import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [product, setProduct] = useState(first10);
    const [cart, setCart] = useState([]);

    // show information in add cart 

    useEffect(() =>{
      
      const savedCart = getDatabaseCart();
      const productkeys = Object.keys(savedCart);
      const previousCart = productkeys.map(pdkey => {
      
      const product = fakeData.find(pd => pd.key === pdkey);
      product.quantity = savedCart[pdkey];
      return product;
     
      
      })
      setCart(previousCart);
      
    },[])




    // product add to card
    const handleAddProduct = (product) => {
        // console.log('product add',product);
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...others, sameProduct];
        }

        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);

        addToDatabaseCart(product.key, count);

    }

    return (

        <div className="shop-container">
            <div className="product-container">

                {
                    product.map(product => <Product showAddToCart={true}
                        handleAddProduct={handleAddProduct} key={product.key}
                        product={product} ></Product>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to="/review">
           <button className="main-button">Review Order</button>
           </Link>
                
                </Cart>

            </div>
        </div>
    );
};

export default Shop;
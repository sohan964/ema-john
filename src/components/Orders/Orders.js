import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import {deleteShoppingCart, removeFromDb} from '../../utilities/fakedb';

const Orders = () => {
    const {products, initialCart} = useLoaderData();
    const [cart, setCart] = useState(initialCart);

    const clearCart = ()=>{
        setCart([]);
        deleteShoppingCart();
    }
    
    const handleRemoveItem = (id) =>{
        console.log(id);

        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);

    }

    return (
        <div className='shop-container'>
            <div className='orders-container'>
                    {
                        cart.map(product => <ReviewItem
                            key={product.id}
                            product={product}
                            handleRemoveItem={handleRemoveItem}
                        ></ReviewItem>)
                    }
                    {
                        cart.length === 0 && <h2>No Items in Cart.Please <Link to="/">buy something</Link></h2>
                        
                        
                    }
            </div>

            <div className='cart-container'>
                <Cart clearCart={clearCart} cart={cart}>
                    <Link to='/shipping'>
                        <button>Processed shipping</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;
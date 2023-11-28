import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    },[]);

    useEffect(()=>{
        const storedCart = getShoppingCart();
        const saveCart =[];
        console.log(storedCart);
        for(const id in storedCart){
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                saveCart.push(addedProduct);

            }
        }
        setCart(saveCart);
    },[products])

    const handleAddToCart = (product) =>{
        let newCart = [];
        const exists = cart.find(p => p.id === product.id);
        if(!exists){
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else{
            const rest = cart.filter(p => p.id !== product.id);
            exists.quantity += 1;
            newCart = [...rest, exists];
        }
        
        setCart(newCart);
        addToDb(product.id)

    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                    {
                        products.map(product => <Product 
                            key={product.id}
                            product = {product}
                            handleAddToCart ={handleAddToCart}
                            ></Product>)
                    }
            </div>

            <div className="cart-container">
                <Cart cart={cart}></Cart>

            </div>
        </div>
    );
};

export default Shop;
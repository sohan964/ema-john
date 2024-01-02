import { getShoppingCart } from "../utilities/fakedb";

export const productsAndCartloader = async ()=>{

    //get Products
    const productsData = await fetch('products.json');
    const products = await productsData.json();

    //get cart
    const savedCart = getShoppingCart();
    //console.log(products);
    const initialCart = [];
    for(const id in savedCart){
        const addedProduct = products.find(product => product.id ===id);
        if(addedProduct){
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
        }
        //console.log(addedProduct);
    }
    return {products, initialCart};
}
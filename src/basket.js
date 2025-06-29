import React, { useEffect, useState } from "react";
import Axios from "axios";

const ShoppingCart = () => {
    const [products, setProducts] = useState([]);

    const fetchShoppingCart = async () => {
        try {
            // const token = localStorage.getItem("res");
            // if (!token) {
            //     console.log("User is not logged in.");
            //     return;
            // }
            const { data } = await Axios.get(`http://localhost:2005/api/shoppingCart`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem("res")}` }
            });
            setProducts(data);
        } catch (error) {
        }
    };
  
    const deleteProductFromShoppingCart = async (productId) => {
        try {
            // const token = localStorage.getItem("res");
            // if (!token) {
            //     alert("You must log in to delete items from the shopping cart.");
            //     return;
            // }

            //const headers = { 'Authorization': `Bearer ${token}` };
            const { data } = await Axios.delete("http://localhost:2005/api/shoppingCart",
            {
                data: { id: productId._id },
                headers: { 'Authorization': `Bearer ${localStorage.getItem("res")}` }
            });
            fetchShoppingCart(); // Refresh shopping cart after deletion
        } catch (error) {
            // console.error('Error deleting product from shopping cart:', error);
        }
    };

    useEffect(() => {
        fetchShoppingCart();
    }, []);

    return (
        <div className="products-container">
            {products.length > 0 ? (
                <div className="product-list">
                    {products.map(p => (
                        <div key={p._id} className="product-item">
                            <div className="product-card">
                                <img src={p.img} alt={p.name} className="product-image" />
                                <div className="product-details">
                                    <h2 className="product-name">{p.name}</h2>
                                    <p className="product-category">Category: {p.category}</p>
                                    <p className="product-price">Price: {p.price}</p>
                                    <button onClick={() => deleteProductFromShoppingCart(p)} className="delete-btn">Delete from Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h1>Your shopping cart is empty.</h1>
            )}
        </div>
    );
};

export default ShoppingCart;






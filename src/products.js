
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { compileFunction } from 'vm';
import './App.css';
function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

        const fetchProducts = async () => {
            try {
                const { data } = await axios.get("http://localhost:2005/api/sport");
                setProducts(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        useEffect(() => {
        fetchProducts();
    }, []);

    const addProductToBasket = async (product) => {
        const products =product._id
        try {
            const token = localStorage.getItem("res");
            if (!token) {
                alert("you cant...")
            }
            else {
                const headers = { 'Authorization': `Bearer ${token}` }
                const res = await axios.post("http://localhost:2005/api/shoppingCart/add", {products}, { headers })
                console.log(res)
                const data = (res.data)
                console.log(data.message);
                alert(data.message)
            }
            console.log("add");
        }
        

       catch (error) {
    console.error('Error adding product to basket:', error);
}
    }


    return (
        <div className="products-container">
            {products.length > 0 ? (
                <div className="product-list">
                    {products.map((product) => (
                        <div key={product._id} className="product-item">
                            <div className="product-card">
                                <img src={product.img} alt={product.name} className="product-image" />
                                <div className="product-details">
                                    <h2 className="product-name">{product.name}</h2>
                                    <p className="product-category">Category: {product.category}</p>
                                    <p className="product-price">Price: {product.price}</p>
                                    <p className="product-sizes">Sizes: {product.sizes}</p>
                                    <button className="add-to-basket" onClick={() => addProductToBasket(product)}>Add to Basket</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}

export default Products;



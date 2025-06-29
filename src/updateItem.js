import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateItem = () => {
    const { id } = useParams(); // קבלת פרמטר המזהה המוצר לעדכון
    const navigate = useNavigate(); // קבלת פונקצית הניווט
    
    const [product, setProduct] = useState({
        code: "",
        category: "",
        name: "",
        price: "",
        sizes: "",
        unitsStock: "",
        img: ""
    });
    

    // בקשה GET עבור קבלת פרטי המוצר הקיים
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await Axios.get(`http://localhost:2005/api/sport/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            }
        };
        
        fetchProduct();
    }, [id]); // בקשה GET תפעל רק פעם אחת עם שינוי דינמי בכתובת ה-URL

    const updateProduct = async () => {
        try {
            await Axios.put(`http://localhost:2005/api/sport/${id}`, product);
            alert("Product updated successfully");
            navigate("/sport"); // מעבר לדף המוצרים לאחר העדכון
        } catch (error) {
            console.error("Failed to update product:", error);
            alert("Failed to update product");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="code"
                value={product.code}
                placeholder="Code"
                onChange={handleChange}
                required
            /><br />
            <input
                type="text"
                name="category"
                value={product.category}
                placeholder="Category"
                onChange={handleChange}
                required
            /><br />
            <input
                type="text"
                name="name"
                value={product.name}
                placeholder="Name"
                onChange={handleChange}
                required
            /><br />
            <input
                type="text"
                name="price"
                value={product.price}
                placeholder="Price"
                onChange={handleChange}
                required
            /><br />
            <input
                type="text"
                name="sizes"
                value={product.sizes}
                placeholder="Sizes"
                onChange={handleChange}
                required
            /><br />
            <input
                type="text"
                name="unitsStock"
                value={product.unitsStock}
                placeholder="Units in Stock"
                onChange={handleChange}
                required
            /><br />
            <input
                type="text"
                name="img"
                value={product.img}
                placeholder="Image URL"
                onChange={handleChange}
                required
            /><br />
            <button type="submit">Update Product</button>
        </form>
    );
};

export default UpdateItem;

import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Sport = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await Axios.get("http://localhost:2005/api/sport");
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("שגיאה בקריאת המוצרים:", error);
                setError("שגיאה בקריאת המוצרים. נסה שוב מאוחר יותר.");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        try {
            const { data } = await Axios.delete(`http://localhost:2005/api/sport/${productId}`);
            console.log("מוצר נמחק:", data);
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error("שגיאה במחיקת המוצר:", error);
        }
    };

    if (loading) return <h1>טוען...</h1>;

    if (error) return <h1>{error}</h1>;

    return (
        <div className="products">
            <Link to="/addItem" className="btn add-btn">הוסף מוצר חדש</Link>

            <div className="product-list">
                {products.map((product) => (
                    <div key={product._id} className="product-item">
                        <img src={product.img} className="product-image" alt={product.name} />
                        <p className="product-code">קוד מוצר: {product.code}</p>
                        <div className="product-actions">
                            <Link to={`/sport/update/${product._id}`} className="btn edit-btn">ערוך מוצר</Link>
                            <button className="btn delete-btn" onClick={() => handleDelete(product._id)}>מחק מוצר</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sport;

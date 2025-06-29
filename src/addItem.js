import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
    const [code, setCode] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [sizes, setSizes] = useState("");
    const [unitsStock, setUnitsStock] = useState("");
    const [img, setImg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post("http://localhost:2005/api/sport", {
                code,
                category,
                name,
                price,
                sizes,
                unitsStock,
                img
            });
            console.log(response.data);
            alert("ההרשמה בוצעה בהצלחה");
            navigate("/sport");
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    alert("המוצר כבר קיים במערכת");
                } else {
                    alert("שגיאת רשת");
                }
            } else {
                alert("שגיאת רשת: לא ניתן להתחבר לשרת");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="קוד"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
            /><br />
            <input
                type="text"
                placeholder="קטגוריה"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            /><br />
            <input
                type="text"
                placeholder="שם"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            /><br />
            <input
                type="number"
                placeholder="מחיר"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            /><br />
            <input
                type="text"
                placeholder="גדלים"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                required
            /><br />
            <input
                type="number"
                placeholder="כמות במלאי"
                value={unitsStock}
                onChange={(e) => setUnitsStock(e.target.value)}
                required
            /><br />
            <input
                type="text"
                placeholder="קישור לתמונה"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                required
            /><br />
            {img && <img src={img} alt="תמונת המוצר" style={{ maxWidth: "200px", maxHeight: "200px" }} />}
            <br />
            <button type="submit">הוספה</button>
        </form>
    );
};

export default AddItem;

import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css"; // קובץ CSS לעיצוב המותאם

const Register = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:2005/api/auth/register",
        {
          userName,
          passWord,
          name,
          email,
          phone,
        }
      );
      console.log(response.data);
      alert("ההרשמה הצליחה");
      navigate("/sport");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          alert(
            "שם המשתמש כבר קיים במערכת, נא לבחור שם משתמש אחר"
          );
        } else {
          alert("בעיה ברשת");
        }
      }
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <form onSubmit={submitForm}>
          <input
            type="text"
            value={userName}
            placeholder="שם משתמש"
            required={true}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <input
            type="password"
            value={passWord}
            placeholder="סיסמה"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            type="text"
            value={name}
            placeholder="שם מלא"
            required={true}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="email"
            value={email}
            placeholder="אימייל"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="tel"
            value={phone}
            placeholder="טלפון"
            required={true}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <button type="submit" disabled={userName === ""}>
            הרשמה
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

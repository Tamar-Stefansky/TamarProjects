import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");
  const navigate = useNavigate();

  const exit = () => {
    localStorage.removeItem("res");
    alert("יצאת מהמערכת");
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.post("http://localhost:2005/api/auth/login", {
        userName,
        passWord,
      });
      const res = response.data;
      localStorage.setItem("res", res.accessToken);
      console.log(res);
      navigate("/products");
    } catch (error) {
      console.error("Oops!", error);
      alert("המשתמש לא קיים במערכת");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  return (
    <div className="login-backraund1">
    <div className="login-container">
      <form className="login-form" onSubmit={submitForm}>
        <input
          value={userName}
          placeholder="שם משתמש"
          required={true}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <input
          value={passWord}
          placeholder="סיסמה"
          type="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" className="login-button">כניסה</button>
        <button type="button" className="exit-button" onClick={exit}>יציאה</button>
      </form>
    </div>
    </div>
  ); 

};

export default Login;

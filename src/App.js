import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sport from "./sport";
import Login from './login';
import Register from './register';
import Basket from './basket';
import Layout from './common/Layout';
import AddItem from './addItem';
import UpdateItem from './updateItem';
import Products from './products';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/sport' element={<Sport />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/addItem' element={<AddItem />} />
            <Route path='/sport/update/:id' element={<UpdateItem />} />
            <Route path='/products' element={<Products />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function HomePage() {
  return (
    <div className="home-page">
      <video src="/YOU CAN DO IT..mp4" autoPlay muted loop className="home-video" />
      <div className="home-content">
        <Link to="/login" className="login-link">
        </Link>
      </div>
    </div>
  );
}

export default App;

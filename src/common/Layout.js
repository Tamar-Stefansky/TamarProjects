import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="App">
      <aside className="sidebar">
        <img src="/עיצוב ללא שם (47).png" alt="Logo" />
        <nav className="nav-links">
          <Link to={'/'}>Home</Link>
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Register</Link>
          <Link to={'/sport'}>Product management</Link>
          <Link to={'/basket'}>Basket</Link>
          <Link to={'/products'}>Products</Link>
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className='navigation-bar'>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;

// mock service worker로 api를 만들어서 사용해보기
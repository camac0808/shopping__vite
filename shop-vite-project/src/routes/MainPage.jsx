import { Outlet, useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <>
      <Outlet />
      <h1>Mainpage</h1>
      <button className="main-button" onClick={() => navigate("/products")}>
        products
      </button>
    </>
  );
}

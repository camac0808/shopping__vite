import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AddToCart from "./AddToCart";

export default function ProductItem({ id, title, category, price, image }) {
  const navigate = useNavigate();

  const handleProductDetail = () => {
    navigate(`/products/${id}`);
  };

  return (
    <li>
      <div className="product-item" onClick={handleProductDetail}>
        <h1 className="product-item__title">{title}</h1>
        <strong className="product-item__category">👀 {category}</strong>
        <strong className="product-item__price">✨ {price}</strong>{" "}
        <img className="product-item__image" src={image} />
      </div>
      <AddToCart id={id} title={title} category={category} price={price} image={image} />
    </li>
  );
}

ProductItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

import PropTypes from "prop-types";

export default function CartItem({ id, title, image, category, price, quantity }) {
  return (
    <li className="cart-item" key={id}>
      <h2 className="cart-item__title">{title}</h2>
      <img className="cart-item__img" src={image} alt={title} />
      <p className="cart-item__category">카테고리 : {category}</p>
      <p className="cart-item__price">가격 : {price}</p>
      <p className="cart-item__quantity">갯수 : {quantity}</p>
    </li>
  );
}


CartItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

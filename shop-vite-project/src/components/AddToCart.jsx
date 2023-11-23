import { PropTypes } from "prop-types";
import { AddToCartFetcher } from "../queryClient";
import { useMutation } from "@tanstack/react-query";

export default function AddToCart({ id, title, category, price, image }) {
  const mutation = useMutation({
    mutationKey: ["cart", id],
    mutationFn: () => AddToCartFetcher(newItem),
  });
  
  // Create a new item object
  const newItem = {
    id,
    title,
    category,
    price,
    image,
  };

  function handleAddCart() {
    // recoil cart state items add new item
    mutation.mutate(newItem);
  }

  return (
    <button className="product-item__button" onClick={handleAddCart}>
      담기
    </button>
  );
}

AddToCart.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

import { PropTypes } from "prop-types";
import { AddToCartFetcher } from "../queryClient";
import { useMutation } from "@tanstack/react-query";

export default function AddToCart({ id, title, category, price, image }) {
  //? addToCartMutation.mutate()를 실행시키면 mutationFn()이 실행된다. mutation = 변화 
  const addToCartMutation = useMutation({
    mutationKey: ["cart", id],
    mutationFn: () => AddToCartFetcher(newItem),
    onSuccess: () => {
      // 추가 완료 후 로직
      console.log("Item added to cart:", newItem);
    },
  });
  
  // Create a new item object
  const newItem = {
    id,
    title,
    category,
    price,
    image,
  };

  return (
    <button className="product-item__button" onClick={addToCartMutation.mutate}>
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

import { PropTypes } from "prop-types";
import { AddToCartFetcher } from "../UseQueryFetch";
import { useMutation } from "@tanstack/react-query";

export default function AddToCart({ id, title, category, price, image }) {
  //? mutation이 뭔가? => mutation = 변화 즉 update delete.. addToCartMutation.mutate()를 실행시키면 mutationFn()이 실행된다. 
  //! onMutate : mutationFn() 실행 전에 실행되는 함수
  //! onSuccess : mutationFn() 실행 후에 실행되는 함수

  const addToCartMutation = useMutation({
    mutationKey: ["cart", id],
    mutationFn: () => AddToCartFetcher(newItem),
    onMutate: () => {
      // 추가 전 로직
      console.log("Mutation started");
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

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PropTypes } from 'prop-types';

export default function DeleteCartItem({ id }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["cart", id],
    mutationFn: async ({ id }) => {
      const fetchOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ id }),
      };
      try {
        const response = await fetch(`http://127.0.0.1:5173/cart`, fetchOptions);
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching the data");
      }
    },
    onSuccess: ({ id }) => {
      console.log(id, "Mutation started")
      queryClient.invalidateQueries("cart");
    },
  });

  return (
    <button className="cart-item__button" onClick={() => mutation.mutate({ id })}>
      삭제
    </button>
  )
}

DeleteCartItem.propTypes = {
  id: PropTypes.number.isRequired,
}
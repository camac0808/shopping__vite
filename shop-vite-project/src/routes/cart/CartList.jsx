import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetCartFetcher } from "../../queryClient";
import CartItem from "../../components/CartItem";

export default function CartPage() {
  const queryClient = useQueryClient();
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["carts"],
    queryFn: () => GetCartFetcher(),
    staleTime: 0, 
    cacheTime: 1000, 
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">Cart</h1>
      <ul className="cart-item__container">
        {data.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </ul>

      <button className="refresh-button" onClick={() => queryClient.invalidateQueries("cart")}>
        Refresh Cart
      </button>
    </div>
  );
}

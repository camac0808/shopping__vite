import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetCartFetcher } from "../../queryClient";
import CartItem from "../../components/CartItem";
import { useEffect } from 'react';

export default function CartPage() {
  const queryClient = useQueryClient();
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["carts"],
    queryFn: () => GetCartFetcher(),
  });

  //? 데이터를 페이지에 들어갈때마다 불러올순 없을까 => useEffect 사용 invalidateQueries
  //! 카트를 추가할때마다 데이터를 불러오고 싶으면 onMutate(optimistic) 방식을 사용
  useEffect(() => {
    queryClient.invalidateQueries("cart");
  }, [queryClient]);

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

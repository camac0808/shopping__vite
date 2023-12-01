import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetCartFetcher } from "../../UseQueryFetch";
import CartItem from "../../components/CartItem";
import { useEffect, useState } from "react";
import { cartListState } from "../../global/recoils";
import { useSetRecoilState } from "recoil";

export default function CartPage() {
  const queryClient = useQueryClient();
  const [allChecked, setAllChecked] = useState(false);

  const setCartItems = useSetRecoilState(cartListState); // recoil state cartItems


  const allCheckedHandler = () => {
    setAllChecked((prev) => !prev);
    //! 리코일의 상태는 불변성을 유지해야 하므로 직접적으로 수정하면 안되고 set 업데이트 함수를 써야한다
    setCartItems((prev) =>
    prev.map((item) => ({
      ...item,
      checked: !allChecked,
    }))
  );
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => GetCartFetcher(),
  });

  // 데이터를 페이지에 들어갈때마다 불러올순 없을까 => useEffect 사용 invalidateQueries
  // 카트를 추가할때마다 데이터를 불러오고 싶으면 onMutate(optimistic) 방식을 사용
  useEffect(() => {
    queryClient.invalidateQueries("cart");
  }, [queryClient]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">Cart</h1>

      <button onClick={allCheckedHandler}>{allChecked ? "전체선택해제" : "전체선택"}</button>

      <ul className="cart-item__container">
        {data.map((item) => (
          <CartItem key={item.id} {...item} allChecked={allChecked}/>
        ))}
      </ul>

      <button className="refresh-button" onClick={() => queryClient.invalidateQueries("cart")}>
        Refresh Cart
      </button>
    </div>
  );
}

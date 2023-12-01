import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DeleteCartItem from "./DeleteCartItem";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartListState } from "../global/recoils";
import { UpdateCartAmountFetcher } from "../UseQueryFetch";

export default function CartItem({ id, title, image, category, price, quantity, allChecked }) {
  const queryClient = useQueryClient();

  const [check, setCheck] = useState(false);

  const setCartItems = useSetRecoilState(cartListState);
  const getCartItems = useRecoilValue(cartListState);

  // cartItems에 id와 check를 넣어준다
  const addCartItems = (checked) => {
    const existingItem = getCartItems.find((item) => item.id === id);

    if (existingItem && existingItem !== undefined) {
      setCartItems((prev) => {
        return prev.map((item) => (item.id === id ? { ...item, checked } : item));
      });
    } else {
      setCartItems((prev) => [...prev, { id, checked }]);
    }
  };

  // 체크박스 클릭시 실행되는 함수
  function handleCheck() {
    // setCheck(getCartItems.find((item) => item.id === id).checked);
    const updatedCheck = !check;
    setCheck(updatedCheck);
    addCartItems(updatedCheck);
    console.log(getCartItems, id);
  }

  // 전체선택 버튼 클릭시 실행되는 함수
  useEffect(() => {
    setCheck(allChecked);
  }, [allChecked, setCheck]);

  // mutation
  const mutation = useMutation({
    mutationKey: ["cart", id],
    mutationFn: UpdateCartAmountFetcher,

    onSuccess: ({ id, amount }) => {
      console.log(id, amount, "Mutation started");
      queryClient.invalidateQueries("cart");
    },
  });

  // 장바구니 수량 변경
  function handleChange(e) {
    const value = parseInt(e.target.value);
    // 변화가 생길때마다 mutationFn()이 실행된다.
    mutation.mutate({ id, amount: parseInt(value) });
  }

  {
    mutation.isLoading ? <div>Loading...</div> : null;
  }

  {
    mutation.isError ? <div>An error occurred: {mutation.error.message}</div> : null;
  }

  {
    mutation.isSuccess ? <div>Todo added!</div> : null;
  }

  return (
    <li className="cart-item" key={id}>
      <input className="cart-item__checkbox" type="checkbox" checked={check} onChange={handleCheck} />
      <h2 className="cart-item__title">{title}</h2>
      <img className="cart-item__img" src={image} alt={title} />
      <p className="cart-item__category">카테고리 : {category}</p>
      <p className="cart-item__price">가격 : {price}</p>
      <input className="cart-item__quantity" type="number" value={quantity} onChange={handleChange} min={1} />
      <DeleteCartItem id={id} />
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
  allChecked: PropTypes.bool.isRequired,
};

import { atom } from "recoil";

// total cart items
export const cartItemsState = atom({
  key: 'cartItems', // unique ID (with respect to other atoms/selectors)
  default: [],
});


import { products } from "./products";
import { http, HttpResponse } from "msw";

// 가짜 바구니 데이터
// new Map은 key-value 쌍으로 이루어진 데이터구조로 각 상품을 고유한 item.id로 식별하여 저장할 수 있음
const cart = new Map();
let cartItemsArray = [];

export const handlers = [
  //* get products
  http.get("/products", () => {
    try {
      return HttpResponse.json(products, {
        status: 200,
      });
    } catch (error) {
      // Handle the error here
      console.error(error);
      return HttpResponse.json({ message: "An error occurred retrieving the products" }, { status: 500 });
    }
  }),

  //* get product detail
  http.get("/products/:id", (request) => {
    try {
      const { id } = request.params;
      const product = products.find((product) => product.id === Number(id));
      return HttpResponse.json(product, {
        status: 200,
      });
    } catch (error) {
      // Handle the error here
      console.error(error);
      return HttpResponse.json({ message: "An error occurred retrieving the product" }, { status: 500 });
    }
  }),

  //* Add to cart
  http.post("/cart", async ({ request }) => {
    try {
      let item = await request.json();

      //? 장바구니에 한번만 담기는 현상 -> 기존 바구니에 담긴 상품이 있으면 수량이 늘도록 수정 => 수정완료
      let existingItem = cart.get(item.id);

      // 기존에 담긴 상품이 있으면 수량만 늘리고, 없으면 수량 1로 추가
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        item = { ...item, quantity: 1 };
        //? new Map() => {item.id => {...values}}
        cart.set(item.id, item);
        console.log(cart);
      }

      //? new Array() => [{...values}]
      cartItemsArray = [...cart.values()];
      console.log("Handler: item added to cart:", cart);

      return HttpResponse.json(item, {
        status: 200,
      });
    } catch (error) {
      // Handle the error here
      console.error(error);
      return HttpResponse.json({ message: "An error occurred adding the item to the cart" }, { status: 500 });
    }
  }),

  //* get cart products
  http.get("/cart", () => {
    console.log("Getting cart:", cartItemsArray);
    try {
      return HttpResponse.json(cartItemsArray, {
        status: 200,
      });
    } catch (error) {
      return HttpResponse.json({ message: "An error occurred retrieving the cart" }, { status: 500 });
    }
  }),

  //* 해당 아이템의 id와 quantity를 받아서 해당 아이템의 quantity를 수정
  http.put("/cart", async ({ request }) => {
    try {
      const item = await request.json();
      cart.set(item.id, { ...cart.get(item.id), quantity: item.amount });
      cartItemsArray = [...cart.values()];

      console.log("Handler: item quantity updated:", cart);
      return HttpResponse.json(item, {
        status: 200,
      });
    } catch (error) {
      return HttpResponse.json({ message: "An error occurred updating the cart" }, 500);
    }
  }),

  //* 해당 아이템의 id를 받아서 해당 아이템을 삭제
  http.delete("/cart", async ({ request }) => {
    try {
      const { id } = await request.json();
      console.log("handler", id);
      cart.delete(Number(id));
      cartItemsArray = [...cart.values()]; 

      console.log("Handler: item deleted from cart:", cart);
      return HttpResponse.json({ message: "Item deleted from cart" }, {
        status: 200,
      });
    } catch (error) {
      return HttpResponse.json({ message: "An error occurred deleting the item from the cart" }, 500);
    }
  }),
];

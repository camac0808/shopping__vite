import { products } from "./products";
import { http, HttpResponse } from "msw";

// 가짜 바구니 데이터
const cart = new Map();
let cartItemsArray = [];

export const handlers = [
  // get products
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

  // get product detail
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

  // add to cart
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
        //? NEW MAP() => MAP(1) {ITEM.ID => {...VALUES}}
        cart.set(item.id, item);
        console.log(cart)
      }
      
      //? NEW ARRAY() => ARRAY(1) [{...VALUES}] 
      cartItemsArray = [...cart.values()];
      console.log("Item added to cart:", cart);

      return HttpResponse.json(item, {
        status: 200,
      });
    } catch (error) {
      // Handle the error here
      console.error(error);
      return HttpResponse.json({ message: "An error occurred adding the item to the cart" }, { status: 500 });
    }
  }),

  // get cart products
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

  // remove from cart
  http.delete("/cart/:id", (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json({ id }), ctx.status(200));
  }),
];

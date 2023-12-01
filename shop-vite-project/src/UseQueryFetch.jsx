// TODO 프론트 fetch 함수

// const API_URL = "https://fakestoreapi.com";
const BASE_URL = "http://127.0.0.1:5173";

// 전체상품 목록 데이터 가져오기
export async function GetProductsFetcher() {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  try {
    const response = await fetch(`${BASE_URL}/products`, fetchOptions);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

// 상품 상세 데이터 가져오기
export async function GetProductsDetailFetcher(id) {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, fetchOptions);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

// 장바구니 상품 가져오기
export async function GetCartFetcher() {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  try {
    const response = await fetch(`${BASE_URL}/cart`, fetchOptions);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

// 장바구니에 상품 추가하기
export async function AddToCartFetcher(newItem) {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(newItem),
  };
  try {
    const response = await fetch(`${BASE_URL}/cart`, fetchOptions);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Failed to add item to cart: ${response.status}`);
    }
  } catch (err) {
    throw new Error(err);
  }
}

// 장바구니 상품 갯수 증가 혹은 감소시키기

export async function UpdateCartAmountFetcher({ id, amount }) {
  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ id, amount }),
  };
  try {
    if (amount < 1) return;

    const response = await fetch(`http://127.0.0.1:5173/cart`, fetchOptions);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching the data");
  }
}

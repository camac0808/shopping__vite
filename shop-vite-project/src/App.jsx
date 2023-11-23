import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./scss/index.scss";
import ErrorPage from "./components/error-page";
import MainPage from "./routes/mainpage";
import ProductList from "./routes/products/ProductList";
import ProductDetail from "./routes/products/[id]";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartList from "./routes/cart/CartList";
import Layout from "./components/Layout";
import { RecoilRoot } from "recoil";

// 개발 환경에서만 사용할 수 있도록 설정
async function enableMocking() {
  console.log("Enabling mocking...");
  if (!import.meta.env.DEV) {
    return;
  }
  const { worker } = await import("./mocks/browser");
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

// 라우팅 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <MainPage /> },
      {
        path: "/products",
        element: <ProductList />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <CartList />,
      },
    ],
  },
]);

//  모든 컴포넌트에서 동일한 QueryClient 인스턴스를 사용할 수 있으므로 캐싱 및 상태 관리가 더 쉬워짐
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // cacheTime이 지나면 캐시를 삭제
      staleTime: 1000 * 60, // staleTime이 지나면 새로운 데이터를 가져옴
      refetchOnMount: false, // 컴포넌트가 마운트 될 때 마다 새로운 데이터를 가져옴
      refetchOnWindowFocus: false, // 윈도우가 포커스 될 때 마다 새로운 데이터를 가져옴
      refetchOnReconnect: false, // 인터넷이 연결될 때 마다 새로운 데이터를 가져옴
    },
  },
});

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <RouterProvider router={router} />
        </RecoilRoot>
      </QueryClientProvider>
    </React.StrictMode>
  );
});

import { useParams } from "react-router-dom";
import { GetProductsDetailFetcher } from "../../queryClient";
import { useQuery } from "@tanstack/react-query";
import ProductDetail from '../../components/ProductDetail';

export default function ProductDetailPage() {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", id],
    // 함수를 실행하는것이 아닌 함수 자체를 넘겨줘야한다.
    queryFn: () => GetProductsDetailFetcher(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>상품이 없습니다.</div>;
  
  return (
    <ProductDetail data={data}/>
  );
}
  
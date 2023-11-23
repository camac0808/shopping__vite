import { useQuery } from "@tanstack/react-query";
import { GetProductsFetcher } from "../../queryClient";
import ProductItem from "../../components/ProductItem";

export default function ProductList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => GetProductsFetcher(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul className='products'>
      {data.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </ul>
  );
}

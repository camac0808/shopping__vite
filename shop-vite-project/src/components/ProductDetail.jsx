import { PropTypes } from "prop-types";

export default function ProductDetail({ data }) {
  const { title, category, description, price, image } = data;

  return (
    <div className="product-detail">
      <h1 className="product-detail__title">{title}</h1>
      <strong className="product-detail__category">👀 {category}</strong>
      <strong className="product-detail__description">📝 {description} </strong>
      <strong className="product-detail__price">✨ {price}</strong>{" "}
      <img className="product-detail__image" src={image} />
    </div>
  );
}

ProductDetail.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

// 박문호 박사 공부법 모듈화 편안하다 - 노력이 없다 - 이해를 하지 마라 - 반복을 통해 몸으로 기억하라 - 이해는 오는 것이다
// backend 과정 간단하게 설명
// '/' get request 요청 처리
// controller -> function getProducts() { return products }
// db connection -> db.query('select * from products') -> return products response
// schema -> products table -> data model // productSchema = { id: 1, title: '...', description: '...', category: '...', price: 1000, image: '...' }
// module.exports = mongoose.model('Product', productSchema) mongoose schema는 데이터베이스 테이블과 접속하여 조회, 수정, 삭제, 생성 등의 작업을 수행할 수 있도록 도와주는 도구
// Product.find() -> return products response
import { Link } from 'react-router-dom';
import imageMap from '../assets/images';

function ProductCard({ product }) {
  return (
    <div className="card h-100">
      {product.image && imageMap[product.image] ? (
        <img
          src={imageMap[product.image]}
          className="card-img-top"
          alt={product.name}
          style={{ height: '200px', width: '100%', objectFit: 'cover' }}
        />
      ) : (
        <div
          className="card-img-top bg-secondary d-flex align-items-center justify-content-center"
          style={{ height: '100%', width: '100%' }}
        >
          <span>Không có ảnh</span>
        </div>
      )}
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Giá: {product.price.toLocaleString()} VND</p>
        <p className="card-text">{product.description.slice(0, 50)}...</p>
        <Link to={`/product/${product.id}`}>
          <button className="btn btn-primary">Chi tiết</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
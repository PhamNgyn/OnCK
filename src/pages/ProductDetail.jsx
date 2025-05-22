import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import imageMap from '../assets/images';

function ProductDetail() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`http://localhost:3000/products/${id}`);

  return (
    <div>
      <h1 className="mb-4">Chi tiết sản phẩm</h1>
      {loading && <p className="text-center">Đang tải...</p>}
      {error && <p className="text-danger">Lỗi: {error}</p>}
      {product && (
        <div className="card">
          <div className="row g-0">
            {/* Cột trái: Ảnh */}
            <div className="col-md-4">
              {product.image && imageMap[product.image] ? (
                <img
                  src={imageMap[product.image]}
                  className="img-fluid rounded-start"
                  alt={product.name}
                  style={{ maxHeight: '600px', objectFit: 'cover', width: '100%' }}
                />
              ) : (
                <div
                  className="bg-secondary d-flex align-items-center justify-content-center rounded-start"
                  style={{ maxHeight: '300px', height: '100%', width: '100%' }}
                >
                  <span>Không có ảnh</span>
                </div>
              )}
            </div>
            {/* Cột phải: Nội dung */}
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="card-text">Giá: {product.price.toLocaleString()} VND</p>
                <p className="card-text">{product.description}</p>
                <Link to="/">
                  <button className="btn btn-secondary mt-3">Quay lại</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
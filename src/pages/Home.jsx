import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts, deleteProduct } from '../features/products/productSlice';

function Home() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Danh sách sản phẩm</h1>
        <Link to="/add">
          <button className="btn btn-success">Thêm sản phẩm</button>
        </Link>
      </div>
      {loading && <p className="text-center">Đang tải...</p>}
      {error && <p className="text-danger">Lỗi: {error}</p>}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col position-relative">
            <ProductCard product={product} />
            <div className="position-absolute top-0 end-0 m-2">
              <Link to={`/edit/${product.id}`}>
                <button className="btn btn-warning btn-sm me-1">Chỉnh sửa</button>
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="btn btn-danger btn-sm"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
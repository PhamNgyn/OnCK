import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../features/products/productSlice';

function AddProduct() {
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({ ...form, price: parseFloat(form.price) }))
      .then(() => {
        navigate('/');
      });
  };

  return (
    <div>
      <h1 className="mb-4">Thêm sản phẩm mới</h1>
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            id="name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Giá</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="form-control"
            id="price"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Mô tả</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            id="description"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Tên file ảnh (ví dụ: a1.png)</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="form-control"
            id="image"
          />
        </div>
        <button type="submit" className="btn btn-primary">Thêm</button>
      </form>
    </div>
  );
}

export default AddProduct;
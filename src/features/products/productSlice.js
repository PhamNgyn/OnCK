import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk để lấy danh sách sản phẩm
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('http://localhost:3000/products');
  return await response.json();
});

// Thunk để thêm sản phẩm
export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  const response = await fetch('http://localhost:3000/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return await response.json();
});

// Thunk để cập nhật sản phẩm
export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, product }) => {
  const response = await fetch(`http://localhost:3000/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return await response.json();
});

// Thunk để xóa sản phẩm (bonus)
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await fetch(`http://localhost:3000/products/${id}`, { method: 'DELETE' });
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
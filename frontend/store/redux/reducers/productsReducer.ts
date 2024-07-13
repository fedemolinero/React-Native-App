// productsReducer.ts

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, AppThunk } from '../store'; // Importa RootState y AppThunk desde store.ts

interface ProductsState {
  products: any[]; // Ajusta el tipo de productos según tu estructura
  productDetails: any | null; // Ajusta el tipo de detalles de productos según tu estructura
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null; // Ajusta el tipo de error a string | null
}

const initialState: ProductsState = {
  products: [],
  productDetails: null,
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('http://localhost:5000/api/products');
    return response.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (sku: string) => {
    const response = await axios.get(`http://localhost:5000/api/stock-price/${sku}`);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Otros reducers si los tienes
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Resetea el error a null al iniciar la carga
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error'; // Maneja el posible valor undefined de action.error.message
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Resetea el error a null al iniciar la carga
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error'; // Maneja el posible valor undefined de action.error.message
      });
  },
});

export default productsSlice.reducer;

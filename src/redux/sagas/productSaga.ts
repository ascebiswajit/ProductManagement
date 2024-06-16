import { takeLatest, call, put } from 'redux-saga/effects';
import { addProduct, editProduct, deleteProduct, fetchProducts } from '../services/productService';
import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from '../actions/productActions';

interface Product {
  id?: string;
  name: string;
  userId: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  image: string;
}

function* addProductSaga(action: { type: string, payload: Product }) {
  try {
    const product: Product = yield call(addProduct, action.payload);
    yield put({ type: ADD_PRODUCT_SUCCESS, payload: product });
  } catch (error: any) {
    console.log('Error adding product:', error);
    yield put({ type: ADD_PRODUCT_FAILURE, payload: error.message });
  }
}

function* editProductSaga(action: { type: string, payload: Product }) {
  try {
    const product: Product = yield call(editProduct, action.payload);
    yield put({ type: EDIT_PRODUCT_SUCCESS, payload: product });
  } catch (error: any) {
    console.log('Error editing product:', error);
    yield put({ type: EDIT_PRODUCT_FAILURE, payload: error.message });
  }
}

function* deleteProductSaga(action: { type: string, payload: { id: string } }) {
  try {
    yield call(deleteProduct, action.payload.id);
    yield put({ type: DELETE_PRODUCT_SUCCESS, payload: action.payload.id });
  } catch (error: any) {
    console.log('Error deleting product:', error);
    yield put({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
}

function* fetchProductsSaga(action: { type: string; payload: string }) {
  try {
    const products: Product[] = yield call(fetchProducts, action.payload);
    yield put({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
  } catch (error: any) {
    console.log('Error fetching products:', error);
    yield put({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
}

export default function* productSaga() {
  yield takeLatest(ADD_PRODUCT_REQUEST, addProductSaga);
  yield takeLatest(EDIT_PRODUCT_REQUEST, editProductSaga);
  yield takeLatest(DELETE_PRODUCT_REQUEST, deleteProductSaga);
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
}
export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const EDIT_PRODUCT_REQUEST = 'EDIT_PRODUCT_REQUEST';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAILURE = 'EDIT_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

interface Product {
  id?: string;
  name: string;
  userId: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  image: string;
}

export const addProductRequest = (product: Product) => ({
  type: ADD_PRODUCT_REQUEST,
  payload: product,
});

export const addProductSuccess = (product: Product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

export const addProductFailure = (error: string) => ({
  type: ADD_PRODUCT_FAILURE,
  payload: error,
});

export const editProductRequest = (product: Product) => ({
  type: EDIT_PRODUCT_REQUEST,
  payload: product,
});

export const editProductSuccess = (product: Product) => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload: product,
});

export const editProductFailure = (error: string) => ({
  type: EDIT_PRODUCT_FAILURE,
  payload: error,
});

export const deleteProductRequest = (id: string) => ({
  type: DELETE_PRODUCT_REQUEST,
  payload: { id },
});

export const deleteProductSuccess = (id: string) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: { id },
});

export const deleteProductFailure = (error: string) => ({
  type: DELETE_PRODUCT_FAILURE,
  payload: error,
});

export const fetchProductsRequest = (userId: string) => ({
  type: FETCH_PRODUCTS_REQUEST,
  payload: userId,
});

export const fetchProductsSuccess = (products: Product[]) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error: string) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

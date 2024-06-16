// productReducer.ts
import { ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE, EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_SUCCESS, EDIT_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from '../actions/productActions';


const initialState = {
  products: [],
  loading: false,
  error: null,
};

export default function productReducer(state = initialState, action: { type: string, payload: any }) {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, loading: false, products: [...state.products, action.payload] };
    case ADD_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EDIT_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_PRODUCT_SUCCESS:
      return { ...state, loading: false, products: state.products.map((product:any) => (product.id === action.payload.id ? action.payload : product)) };
    case EDIT_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_PRODUCT_SUCCESS:
      return { ...state, loading: false, products: state.products.filter((product:any) => product.id !== action.payload) };
    case DELETE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

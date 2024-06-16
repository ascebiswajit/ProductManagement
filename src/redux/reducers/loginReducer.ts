import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/loginActions';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isSuccess: false,
};

export default function loginReducer(state = initialState, action: { type: string, payload: any }) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null, isSuccess: false };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload, isSuccess: true };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload, isSuccess: false };
    default:
      return state;
  }
}

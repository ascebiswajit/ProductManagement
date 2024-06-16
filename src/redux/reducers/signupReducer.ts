import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/signupActions';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isSuccess: false,
};

export default function signupReducer(state = initialState, action: { type: string, payload: any }) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, loading: true, error: null , isSuccess: false};
    case SIGNUP_SUCCESS:
      return { ...state, loading: false, user: action.payload , isSuccess: true};
    case SIGNUP_FAILURE:
      return { ...state, loading: false, error: action.payload , isSuccess: false };
    default:
      return state;
  }
}

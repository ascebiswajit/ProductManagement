export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export interface User {
  email: string;
  password: string;
  username: string;
}

export const signUpRequest = (user: User) => ({
  type: SIGNUP_REQUEST,
  payload: user,
});

export const signUpSuccess = (user: any) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signUpFailure = (error: string) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});



// sagas/index.js
import { all } from 'redux-saga/effects';
import AuthloginSaga from './loginSaga';
import AuthsignupSaga from './signupSaga';
import productSaga from './productSaga';

export default function* rootSaga() {
  yield all([
    AuthsignupSaga(),
    AuthloginSaga(),
    productSaga(),
  ]);
}

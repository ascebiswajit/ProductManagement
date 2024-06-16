import { takeLatest, call, put } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, loginFailure } from '../actions/loginActions';
import auth from '@react-native-firebase/auth';

export interface ResponseGenerator {
  email?: string;
  password?: string;
  user?: any;
}

function* loginSaga(action: { type: string, payload: { email: string, password: string } }) {
  try {
    const { email, password } = action.payload;
    const userCredential: ResponseGenerator = yield call(
      [auth(), auth().signInWithEmailAndPassword],
      email,
      password
    );

    yield put(loginSuccess(userCredential.user));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

export default function* AuthloginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

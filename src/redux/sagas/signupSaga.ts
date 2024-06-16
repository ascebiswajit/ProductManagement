import { takeLatest, call, put } from 'redux-saga/effects';
import { SIGNUP_REQUEST, signUpSuccess, signUpFailure } from '../actions/signupActions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export interface ResponseGenerator {
  email?: string;
  password?: string;
  username?: string;
  user?: any;
}

function* signupSaga(action: { type: string, payload: { email: string, password: string, username: string } }) {
  try {
    const { email, password, username } = action.payload;
    const userCredential: ResponseGenerator = yield call(
      [auth(), auth().createUserWithEmailAndPassword],
      email,
      password
    );

    const userData = {
      id: userCredential.user.uid,
      username: username,
      email: email,
      password: password
    };

    yield call(
      [firestore().collection('users').doc(userCredential.user.uid), 'set'],
      userData
    );

    yield put(signUpSuccess(userCredential.user));
  } catch (error: any) {
    console.log('Error creating user:', error);
    yield put(signUpFailure(error.message));
  }
}

export default function* AuthsignupSaga() {
  yield takeLatest(SIGNUP_REQUEST, signupSaga);
}

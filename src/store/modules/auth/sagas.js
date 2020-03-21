import { takeLatest, call, put, all } from 'redux-saga/effects';
import Toast from 'react-native-root-toast';

import { signInSuccess, signFailure } from './actions';

// import history from '~/services/history';
import api from '~/services/api';

export function* signIn({ payload: { email, password } }) {
  try {
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    // if (!user.provider) {
    //   Toast.show('Usuário não é um prestador', {
    //     backgroundColor: 'red',
    //   });

    //   return;
    // }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (ex) {
    Toast.show('Falha na autenticação, verifique seus dados.', {
      backgroundColor: 'red',
    });
    yield put(signFailure());
  }
}

export function* signUp({ payload: { name, email, password } }) {
  try {
    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    // history.push('/');
  } catch (ex) {
    console.tron.log(ex);
    Toast.show('Falha no cadastro, verifique seus dados.', {
      backgroundColor: 'red',
    });
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (!token) {
    return;
  }

  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function signOut() {
  //   history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);

import Axios from 'axios';

// For type
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

// LoginPage의 body에 email,pw를 parameter를 통해서 받는 것임.
export function loginUser(dataToSubmit) {

    // server에게서 받은 data를 request에 저장 후
    const request = Axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    // Reducer에게 보내줘야한다.
    // previousState과 action을 조합해서 nextState를 만들어야한다.
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    const request = Axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth(dataToSubmit) {
    const request = Axios.get('/api/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}
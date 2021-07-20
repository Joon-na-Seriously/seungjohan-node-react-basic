import axios from 'axios';

// For type
import {
    LOGIN_USER
} from './types';

// LoginPage의 body에 email,pw를 parameter를 통해서 받는 것임.
export function loginUser(dataToSubmit) {

    // server에게서 받은 data를 request에 저장 후
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    // Reducer에게 보내줘야한다.
    // previousState과 action을 조합해서 nextState를 만들어야한다.
    return {
        type: LOGIN_USER,
        payload: request
    }
}
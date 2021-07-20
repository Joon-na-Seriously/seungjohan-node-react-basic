// for type
import {
    LOGIN_USER,
    REGISTER_USER
} from '../_actions/types';

export default function (state={}, action) {

    switch (action.type) {
        case LOGIN_USER:
            // spread operator ... => state를 그냥 그대로 가져오는 것 => 빈 상태
            return { ...state, loginSuccess: action.payload }

        case REGISTER_USER:
            return { ...state, register: action.payload }

        default:
            return state;

    }
}
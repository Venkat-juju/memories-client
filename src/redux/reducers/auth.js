import { AUTH_SUCCESS, AUTH_FAILED, LOGIN, LOGOUT } from '../constants/ActionTypes';

// reducer is nothing but a function that takes state and action as the input and do something with the store
const authReducer = (state = {authData: null, err: null}, action) => {
    switch(action.type) {
        case AUTH_SUCCESS:
            console.log("Inside the AUTH_SUCCESS reducer");
            localStorage.setItem('profile', JSON.stringify({ ...action.data }));
            console.log(JSON.stringify({ ...action.data }));
            return {...state, authData: action.data, err: null };
        case AUTH_FAILED:
            return { ...state, err: action.data};
        case LOGIN:
            return { ...state, err: null, authData: null};
        case LOGOUT:
            localStorage.removeItem('profile');
            return { ...state, authData: null };
        default:
            return state;
    }
}

export default authReducer;
import { AUTH_SUCCESS, AUTH_FAILED, LOGIN } from '../constants/ActionTypes';
import * as api from '../api/index';

export const signup = (formData, history) => async(dispatch) => {

    dispatch({ type: LOGIN, data: null });

    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH_SUCCESS, data});

        history.push('/');
    } catch (err) {
        const { data } = err.response;
        dispatch({ type: AUTH_FAILED, data: data.message });
    }
};

export const signin = (formData, history) => async (dispatch) => {

    dispatch({ type: LOGIN, data: null });

    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH_SUCCESS, data});
        console.log("AUTH_SUCCESS Action dispatched");

        history.push('/');
        console.log("history pushed");
    } catch (err) {
        const { data } = err.response;
        dispatch({ type: AUTH_FAILED, data: data.message });
    }
};
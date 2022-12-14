import * as APIUtil from '../util/session_api_util';
import jwtDecode from 'jwt-decode';

export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RECEIVE_USER_SIGN_IN = 'RECEIVE_USER_SIGN_IN';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});
export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

export const receiveUserSignIn = () =>({
    type: RECEIVE_USER_SIGN_IN
});

export const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
})

export const login = (user) => dispatch => {
    return APIUtil.login(user).then(
        res => {
            const {token} = res.data;
            localStorage.setItem('jwtToken',token);
            APIUtil.setAuthToken(token);
            const decoded = jwtDecode(token);
            dispatch(receiveCurrentUser(decoded));
        },
        errors => dispatch(receiveSessionErrors(errors.response.data))
        )
}

export const signup = (user) => dispatch => {
    return APIUtil.signup(user).then(
        res => dispatch(receiveUserSignIn()),
        errors => dispatch(receiveSessionErrors(errors.response.data))
        )
};

export const logout = () =>dispatch => {
    localStorage.removeItem('jwtToken');
    APIUtil.setAuthToken(false)
    dispatch(logoutUser());
}


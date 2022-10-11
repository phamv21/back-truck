import * as APIUtil from '../util/session_api_util';
import jwtDecode from 'jwt-decode';

export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';
export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const logout = () =>dispatch => {
    localStorage.removeItem('jwtToken');
    APIUtil.setAuthToken(false)
    dispatch(logoutUser());
}


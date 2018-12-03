import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}


export const authSuccess = (authData) => {
    const { idToken, localId} = authData;
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId: localId
    };
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    };
}

export const auth = ( email, password, admin ) => {
    return dispatch => {
        dispatch(authStart());
        if (email !== admin){
            const error = { message: "INVALID_EMAIL"}
            dispatch(authFail(error))}
        else {
            const authData = {
                email: email,
                password: password,
                returnSecureToken: true,
            }
            let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCDGAU3I4HyqS9641CCDLCLphNxjCBcC8U'
            axios.post(url, authData)
            .then(response => {
                console.log(response)
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
        }
    };
}
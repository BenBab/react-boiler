import * as actionTypes from './actionTypes'
import firebase from'firebase';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}


export const authSuccess = (user) => {
    const { uid } = user;
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: uid
    };
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error
    };
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (signInTime) => {

    return dispatch => {
        setTimeout(() => {
            const user = firebase.auth().currentUser
            if(user.metadata.b === signInTime){
                dispatch(logout())
            }
        }, 20000);
    };
}
//could use the firebase.auth() to authenticate which would have been easier, but this gives flexibility to not be locked into firebase
export const auth = ( email, password, admin ) => {
    return dispatch => {
        dispatch(authStart());
        if (email !== admin){
            const error = "auth/user-not-found"
            dispatch(authFail(error))}
        else {
            // const authData = {
            //     email: email,
            //     password: password,
            //     returnSecureToken: true,
            // }
            // let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCDGAU3I4HyqS9641CCDLCLphNxjCBcC8U'
            // axios.post(url, authData)
            // .then(response => {
            //     console.log(response)
            //     dispatch(authSuccess(response.data));
            //     dispatch(checkAuthTimeout(response.data.expiresIn))
            // })
            // .catch(err => {
            //     console.log(err);
            //     dispatch(authFail(err.response.data.error));
            // })

            firebase.auth().signInWithEmailAndPassword(email, password)
               .then(response => {
                  console.log(response)
                  return firebase.auth().currentUser;
                
              }).then(user => {
                dispatch(authSuccess(user));
                //dispatch(checkAuthTimeout(user.metadata.b))
              })
              .catch(function(err) {
                // Handle Errors here.
                var errorCode = err.code;
                // var errorMessage = err.message;
                dispatch(authFail(errorCode ));
                });
            }
        }
    };

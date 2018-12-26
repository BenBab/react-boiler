import * as actionTypes from './actionTypes'
import firebase from 'firebase';


export const storeRoutes = (routes) => {
    return {
        type: actionTypes.STORE_PAGE_ROUTES,
        routes
    };
}

export const updatePageStart = () => {
    return {
        type: actionTypes.UPDATE_PAGE_START
    };
}

export const updatePageSuccess = () => {
    return {
        type: actionTypes.UPDATE_PAGE_SUCCESS,
    };
}

export const updatePageFail = (error) => {
    return {
        type: actionTypes.UPDATE_PAGE_FAIL,
        error: error
    };
}

export const removeStateBackup = () => {
    return {
        type: actionTypes.REMOVE_STATE_BACKUP
    };
}

export const resetToast = () =>{
    return {
        type: actionTypes.RESET_UPDATE_TOAST
    };
}

export const updatePageSubmit= ( URL, pageInfo ) => {
    return dispatch => {
        dispatch(updatePageStart());
        if (!pageInfo){
            const error = { message: "INVALID_TITLE"}
            dispatch(updatePageFail(error))}
        else {
            console.log('update page initial')
            firebase.database().ref().child(URL).update(pageInfo , function(err) {
                if (err) {
                  // The write failed...
                  dispatch(updatePageFail(err.response.data.error));
                } else {
                  // Data saved successfully!
                  console.log('Data saved successfully!')
                  dispatch(updatePageSuccess());

                  dispatch(removeStateBackup());
                  setTimeout(() => { 
                    dispatch(resetToast());
                  }, 7000 );

                }
            })
            

        }
    };
}



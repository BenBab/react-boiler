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

const cleanPageObj = (obj) => {
    console.log(obj)
    let cleanedObj = Object.assign({}, obj)
    const emptyVals = Object.keys(obj).filter((key, i) => {
        let property = obj[key]
        return property === ''
    })

    Object.keys(obj).map((key, i) => {
        let property = obj[key]
        emptyVals.map(val => {
            if ( key.includes(val) ){
                property = null;
            }
        })
        return cleanedObj = { ...cleanedObj,  [key] : property }
    });

    return cleanedObj;
}

export const updatePageSubmit= ( URL, pageInfo ) => {
    return dispatch => {
        dispatch(updatePageStart());
        if (!pageInfo){
            const error = { message: "INVALID_TITLE"}
            dispatch(updatePageFail(error))}
        else {
            const cleanedPageObj = cleanPageObj(pageInfo)
            console.log('update page initial')
            firebase.database().ref().child(URL).update(cleanedPageObj , function(err) {
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



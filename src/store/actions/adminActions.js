import * as actionTypes from './actionTypes'
import axios from 'axios'


export const updatePageStart = () => {
    return {
        type: actionTypes.UPDATE_PAGE_START
    };
}

export const updatePageSuccess = (pageData) => {
    return {
        type: actionTypes.UPDATE_PAGE_SUCCESS,
        pageData
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
            axios.put(URL, pageInfo)
            .then( response => {
                console.log(response)
                dispatch(updatePageSuccess(response.data));
                dispatch(removeStateBackup());
                setTimeout(() => { 
                    dispatch(resetToast());
                }, 7000 );
            })
            .catch(err => {
                console.log(err);
                // this.setState({loading: false, error: err})
                dispatch(updatePageFail(err.response.data.error));
            })

        }
    };
}


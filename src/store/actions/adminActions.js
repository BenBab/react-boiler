import * as actionTypes from './actionTypes'
import axios from 'axios'


export const updatePageStart = () => {
    return {
        type: actionTypes.UPDATE_PAGE_START
    };
}

export const updatePageSuccess = () => {
    return {
        type: actionTypes.UPDATE_PAGE_SUCCESS
    };
}

export const updatePageFail = () => {
    return {
        type: actionTypes.UPDATE_PAGE_FAIL
    };
}


// export const updateNewPage = (pageInfo) => {
//     return {
//         type: actionTypes.UPDATE_PAGE,
//         pageInfo
//     };
// }


export const updatePage= ( url, pageInfo ) => {
    return dispatch => {
        dispatch(updatePageStart());
        if (pageInfo.title === ''){
            const error = { message: "INVALID_TITLE"}
            dispatch(updatePageFail(error))}
        else {
            console.log('update page initial')
            axios.post(url, pageInfo)
            .then(response => {
                console.log('update page resopnse',response)
                // dispatch(authSuccess(response.data));
                // dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err);
                dispatch(updatePageFail(err.response.data.error));
            })
        }
    };
}


// export const updatePage = (payload) => {
//     return dispatch => {
        

//     };
// }


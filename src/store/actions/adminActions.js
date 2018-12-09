import * as actionTypes from './actionTypes'
import axios from 'axios'


export const addPageStart = () => {
    return {
        type: actionTypes.ADD_PAGE_START
    };
}

export const addPageSuccess = () => {
    return {
        type: actionTypes.ADD_PAGE_SUCCESS
    };
}

export const addPageFail = () => {
    return {
        type: actionTypes.ADD_PAGE_FAIL
    };
}


// export const addNewPage = (pageInfo) => {
//     return {
//         type: actionTypes.ADD_PAGE,
//         pageInfo
//     };
// }


export const addNewPage = ( url, pageInfo ) => {
    return dispatch => {
        dispatch(addPageStart());
        if (pageInfo.title === ''){
            const error = { message: "INVALID_TITLE"}
            dispatch(addPageFail(error))}
        else {
            console.log('new page initial')
            axios.post(url, pageInfo)
            .then(response => {
                console.log('new page resopnse',response)
                // dispatch(authSuccess(response.data));
                // dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err);
                dispatch(addPageFail(err.response.data.error));
            })
        }
    };
}


// export const addPage = (payload) => {
//     return dispatch => {
        

//     };
// }


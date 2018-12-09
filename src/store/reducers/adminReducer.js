import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'


const initialState = {
    title: '',
    route: '',
    navigationItems: [],
    loading: false,
    error: null

}

const addPageStart = ( state, action ) => {
    return updateObject( state, {
        loading: true,
        error: null
    })
}

const addPageSuccess = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        error: null
    })
}

const addPageFail = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        error: action.error
         
    })
}


const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_PAGE_START:
            return addPageStart( state, action )
        case actionTypes.ADD_PAGE_SUCCESS:
            return addPageSuccess( state, action )
        case actionTypes.ADD_PAGE_FAIL:
            return addPageFail( state, action )
        // case actionTypes.ADD_PAGE_SUCCESS:
        //     return authLogout( state, action)
        // case actionTypes.ADD_PAGE_FAIL:
        //     return authLogout( state, action)
        default:
            return state;
    }
}

export default reducer;
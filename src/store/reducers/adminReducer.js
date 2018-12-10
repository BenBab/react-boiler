import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'


const initialState = {
    title: '',
    route: '',
    navigationItems: [],
    loading: false,
    error: null

}

const updatePageStart = ( state, action ) => {
    return updateObject( state, {
        loading: true,
        error: null
    })
}

const updatePageSuccess = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        error: null
    })
}

const updatePageFail = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        error: action.error
         
    })
}


const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.UPDATE_PAGE_START:
            return updatePageStart( state, action )
        case actionTypes.UPDATE_PAGE_SUCCESS:
            return updatePageSuccess( state, action )
        case actionTypes.UPDATE_PAGE_FAIL:
            return updatePageFail( state, action )
        // case actionTypes.UPDATE_PAGE_SUCCESS:
        //     return authLogout( state, action)
        // case actionTypes.UPDATE_PAGE_FAIL:
        //     return authLogout( state, action)
        default:
            return state;
    }
}

export default reducer;
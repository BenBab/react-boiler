import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'


const initialState = {
    title: '',
    route: '',
    navigationItems: []
}

const newPageData = ( state, action ) => {
    // const route = 

    return updateObject( state, {
        title: action.title,
         
    })
}


const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.NEW_PAGE_DATA:
            return newPageData( state, action )
        // case actionTypes.CLEAR_NEW_PAGE_DATA:
        //     return clearNewPageData( state, action )
        // case actionTypes.ADD_PAGE:
        //     return authFail( state, action )
        // case actionTypes.ADD_PAGE_SUCCESS:
        //     return authLogout( state, action)
        // case actionTypes.ADD_PAGE_FAIL:
        //     return authLogout( state, action)
        default:
            return state;
    }
}

export default reducer;
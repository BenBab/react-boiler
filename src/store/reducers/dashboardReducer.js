import * as actionTypes from '../actions/actionTypes';
import { updateObject, updatePageUtil, updateSubPageUtil } from '../utility';

const initialState = {
    home: null,
    navigationItems: null,
    admin: null
};

const setData = (state, action) => {
    return updateObject( state, {
        home: action.data.home,
        navigationItems: action.data.navigationItems || null,
        admin: action.data.administrator
    } );
};

const updatePageState = ( state, action ) => {
    const { name, value } = action.eventTarget

    if ( action.parentId === null ){
        return updatePageUtil(state, action, name, value )
    }else {
        return updateSubPageUtil(state, action, name, value )
    }
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SETDATA: 
            return setData(state, action);
        case actionTypes.CHANGE_PAGE_DATA:
            return updatePageState( state, action ) 
        default: return state;
    }
};

export default reducer;
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

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

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SETDATA: return setData(state, action);    
        default: return state;
    }
};

export default reducer;
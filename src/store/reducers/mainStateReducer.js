import * as actionTypes from '../actions/actionTypes';
import { updateObject, updatePageUtil, updateSubPageUtil } from '../utility';

const initialState = {
    home: null,
    navigationItems: null,
    admin: null,
    state_copy: null,
    
};

const setData = (state, action) => {
    return updateObject( state, {
        home: action.data.home,
        navigationItems: action.data.navigationItems || null,
        admin: action.data.administrator
    } );
};

const createStateBackup = ( state, action ) => {
    if (state.state_copy === null){
        return updateObject( state, {
            state_copy : state
        });
    }
    else { return state; }
}

const removeStateBackup = ( state, action ) => {
    return updateObject( state, {
        state_copy : null
    });
}

const updatePageState = ( state, action ) => {
    const { name, value } = action.eventTarget

    if ( action.parentId === null ){
        return updatePageUtil(state, action, name, value )
    }else {
        return updateSubPageUtil(state, action, name, value )
    }
}

const revertState = (state, action) => {
    return updateObject( state, {
        home : state.state_copy.home,
        navigationItems: state.state_copy.navigationItems,
        state_copy: null
    });
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SETDATA: 
            return setData(state, action);
        case actionTypes.CHANGE_PAGE_DATA:
            return updatePageState( state, action )
        case actionTypes.CHECK_STATE_BACKUP:
            return createStateBackup( state, action ) 
        case actionTypes.REMOVE_STATE_BACKUP:
            return removeStateBackup( state, action )  
        case actionTypes.REVERT_STATE_CHANGE:
            return revertState( state, action ) 
        default: return state;
        
    }
};

export default reducer;



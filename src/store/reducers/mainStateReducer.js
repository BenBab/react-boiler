import * as actionTypes from '../actions/actionTypes';
import { updateObject, updatePageUtil, updateSubPageUtil } from '../utility';

const initialState = {
    home: null,
    navigationItems: null,
    admin: null,
    images: null,
    state_copy: null,
    template: null
};

const setData = (state, action) => {
    return updateObject( state, {
        home: action.data.home,
        navigationItems: action.data.navigationItems || null,
        images: action.data.images,
        template:action.data.template,
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

const updateState = ( state, action ) => {
    const { name, value } = action.eventTarget

    if(action.id === 'template'){
        const newStateObj = Object.assign({}, state[action.id],{[name] : value})
        return updateObject( state, {
            [action.id] : newStateObj
        });
    } else 

    if( action.id === 'home'){
        return {
            ...state,
                home : {
                ...state.home,
                    content: {
                        ...state.home.content,
                        [name] : value
                    }
            }
        }    
    } else

    if ( action.parentId === null ){
        return updatePageUtil(state, action, name, value )
    } else 

    if (action.parentId && action.id) {
        return updateSubPageUtil(state, action, name, value )
    } else {
        console.error('no updateState conditions were met')
    }
}

const revertState = (state, action) => {
    if (state.state_copy !== null){
        return updateObject( state, {
            home : state.state_copy.home,
            navigationItems: state.state_copy.navigationItems,
            template: state.state_copy.template,
            state_copy: null
        });
    }else { return state }
}


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SETDATA: 
            return setData(state, action);
        case actionTypes.CHANGE_PAGE_DATA:
            return updateState( state, action )
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



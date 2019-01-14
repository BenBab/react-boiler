export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const updateHomeState = ( state, action, name, value ) => {
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
}

export const updatePluginsState = ( state, action, name, value ) => {
    return { 
        ...state,
        plugins : {
        ...state.plugins,
            [action.parentId]: {
                ...state.plugins[action.parentId],
                [name] : value
            }
        }
    }
}

export const updatePageUtil = ( state, action, name, value ) => {

    return {
        ...state,
        navigationItems : {
            ...state.navigationItems,
            [action.id] : {
                ...state.navigationItems[action.id],
                content : {
                    ...state.navigationItems[action.id].content,
                    [name] : value
                }
            }
        }
    }
}

export const updateSubPageUtil = ( state, action, name, value ) => {

    return {
        ...state,
        navigationItems : {
            ...state.navigationItems,
            [action.parentId] : {
                ...state.navigationItems[action.parentId],
                dropdownPages : {
                    ...state.navigationItems[action.parentId].dropdownPages,
                    [action.id] : {
                        ...state.navigationItems[action.parentId].dropdownPages[action.id],
                        content : {
                            ...state.navigationItems[action.parentId].dropdownPages[action.id].content,
                            [name] : value
                        }
                    }
                }
            }
        }
    }
}



export const cleanPageObj = (obj, state, action, updatefunction) => {
    let newState = Object.assign({}, state)
    const emptyVals = Object.keys(obj).filter((key, i) => {
        let property = obj[key]
        return property === ''
    })

    Object.keys(obj).map((key, i) => {
        let property = obj[key]
        return emptyVals.map(val => {
            if ( key.includes(val) ){
                property = '';
               return newState = updatefunction( newState, action, key, property );
            }
        })
    })
    

    return newState;
} 
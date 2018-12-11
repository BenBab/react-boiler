export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

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
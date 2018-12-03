import React from 'react'
import styled from 'styled-components';

import Tabs from '../Tabs'
 
const TabItems = (props) => {
    console.log('tabItems props', props)
    if (props.itemProps.dropdownPages){
        return( <Tabs navigationItems={props.itemProps.dropdownPages} parent={props.children}/>  )
    }

    return (
        <StyledTabItems>
          {props.children}
        </StyledTabItems>
    );
}

const StyledTabItems = styled.div`
    padding: 3vh;
`;


export default TabItems
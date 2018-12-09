import React from 'react'
import styled from 'styled-components';
import Input from '../../Input'

import Tabs from '../Tabs'
 
const TabItems = (props) => {
    console.log('tabItems props', props)
    if (props.itemProps.dropdownPages){
        return( <Tabs navigationItems={props.itemProps.dropdownPages} parent={props.children}/>  )
    }

    return (
        <StyledTabItems>
          {props.children}
          <Input inputtype="input" label='Top Image' />
          <Input inputtype="textarea" label='Main Body Text'  />

        </StyledTabItems>
    );
}

const StyledTabItems = styled.div`
    padding: 3vh;
`;


export default TabItems
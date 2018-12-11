import React from 'react'
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

import Input from '../../Input'
import Tabs from '../Tabs'
import Button from '../../Buttons/Button'
import Flex from '../../Wrappers/Flex'
 
const TabItems = (props) => {
    console.log('tabItems props', props)
    if (props.itemProps.dropdownPages){
        return( <Tabs navigationItems={props.itemProps.dropdownPages} parentId={props.pageId} parent={props.children} onChange={props.onChange}/>  )
    }

    const handleChange = (event) =>{
        event.preventDefault();
        props.onChange(event.target, props.pageId, props.parentId )
    }

    const { mainText } = props.itemProps.content

    return (
        <Paper elevation={20}>
            <StyledTabItems>
              {props.children}
              <Input inputtype="input" label='Top Image' onChange={handleChange}/>
              <Input inputtype="textarea" label='Main Body Text' name='mainText' value={mainText} onChange={handleChange}/>
            </StyledTabItems>
            <Flex justifyContent='flex-end'>
                <Button margin="2px 0 15px" >Cancel</Button>
                <Button margin="2px 20px 15px" onClick={props.updatePageSubmit}>Update</Button>
            </Flex>
        </Paper>
    );
}

const StyledTabItems = styled.div`
    padding: 3vh;
`;


export default TabItems
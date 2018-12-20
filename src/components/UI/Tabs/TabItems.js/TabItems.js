import React from 'react'
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

import Input from '../../Input'
import Tabs from '../Tabs'
import Button from '../../Buttons/Button'
import Flex from '../../Wrappers/Flex'
import Spinner from '../../Spinner'
 
const TabItems = (props) => {
    console.log('tabItems props', props)
    if (props.itemProps.dropdownPages){
        return( 
        <Tabs 
            navigationItems={props.itemProps.dropdownPages} 
            parentId={props.pageId} 
            parent={props.children} 
            onChange={props.onChange}
            openMediaModal={props.openMediaModal}
            updatePageSubmit={props.updatePageSubmit}
            isUpdating={props.isUpdating}
            cancelUpdate={props.cancelUpdate}
            />  )
    }

    const handleChange = (event) =>{
        event.preventDefault();
        props.onChange(event.target, props.pageId, props.parentId )
    }

    const handleSelect = (event) => {
        event.preventDefault();
        props.openMediaModal(event.target, props.pageId, props.parentId)
    }

    const handlesubmit = (event) => {
        event.preventDefault();
        props.updatePageSubmit(props.itemProps.content, props.pageId, props.parentId )
    }



    const { topPageImg, mainText } = props.itemProps.content

    return (
        <Paper elevation={20}>
            <StyledTabItems>
              <div>
                {props.children}
                <Input inputtype="inputSelector" label='Top Image' name="topPageImg" value={topPageImg} onChange={handleChange} onClick={handleSelect} />
                <Input inputtype="textarea" label='Main Body Text' name='mainText' value={mainText} onChange={handleChange}/>
              </div>
              <div>
                  wireframe image location
              </div>
            </StyledTabItems>
            <Flex justifyContent='flex-start'>
                <Button margin="2px 5px 15px 20px" onClick={handlesubmit}>Update</Button>
                {props.isUpdating &&
                    <Spinner/>
                }
                <Button margin="2px 20px 15px 20px" onClick={props.cancelUpdate} >Cancel</Button>
            </Flex>
        </Paper>
    );
}

const StyledTabItems = styled.div`
    padding: 3vh;
    display: grid;
    grid-template-columns: 65% 35%;
`;


export default TabItems
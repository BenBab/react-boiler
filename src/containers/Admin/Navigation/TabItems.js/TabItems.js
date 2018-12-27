import React from 'react'
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

import Input from '../../../../components/UI/Input'
import TabMenu from '../TabsMenu'
import Button from '../../../../components/UI/Buttons/Button'
import Flex from '../../../../components/UI/Wrappers/Flex'
import Box from '../../../../components/UI/Wrappers/Box'
import Spinner from '../../../../components/UI/Spinner'
 
const TabItems = (props) => {
    console.log('tabItems props', props)
    if (props.itemProps.dropdownPages){
        return( 
        <TabMenu 
            navigationItems={props.itemProps.dropdownPages} 
            parentId={props.pageId} 
            parent={props.children} 
            onChange={props.onChange}
            openMediaModal={props.openMediaModal}
            updatePageSubmit={props.updatePageSubmit}
            isUpdating={props.isUpdating}
            cancelUpdate={props.cancelUpdate}
            stateBackup={props.stateBackup}
            availableRoutes={props.availableRoutes}
            />  )
    }

    const handleChange = (event) =>{
        event.preventDefault();
        props.onChange(event.target, props.pageId, props.parentId )
    }

    const handleCheckbox = check => event => {
        console.log(check , event.target.checked)
        const newevent =  {
            name: event.target.name,
            value: event.target.checked
        }
        props.onChange(newevent, props.pageId, props.parentId )
    };

    const handleMediaModal = (event) => {
        event.preventDefault();
        props.openMediaModal(event.target, props.pageId, props.parentId)
    }

    const handlesubmit = (event) => {
        event.preventDefault();
        props.updatePageSubmit(props.itemProps.content, props.pageId, props.parentId )
    }

    const {
        topPageImg, topBannerSize,topBannerTxtRightSide, topBannerTitle, topBannerSubtitle, topBannerDescription, topBannerName, topBannerLink,
        mainText
    } = props.itemProps.content


    return (
        <Paper elevation={20}>
            <StyledTabItems>
              <div>
                {props.children}
                <Input inputtype="inputSelector" label='Top Banner Image' name="topPageImg" value={topPageImg} onChange={handleChange} onClick={handleMediaModal} />
                    {topPageImg &&
                      <Box>
                        <Flex>
                            <Input inputtype="checkbox" sideLabel="Banner Image Halfwidth" name='topBannerSize' checked={topBannerSize} handleChange={handleCheckbox}/>
                            <Input inputtype="checkbox" sideLabel="Banner Text Right Side" name='topBannerTxtRightSide' checked={topBannerTxtRightSide} handleChange={handleCheckbox}/>
                        </Flex>
                        <Input inputtype="input" label='Top Banner Title' name='topBannerTitle' value={topBannerTitle} onChange={handleChange}/> 
                        <Input inputtype="input" label='Top Banner Subtitle' name='topBannerSubtitle' value={topBannerSubtitle} onChange={handleChange}/>
                        <Input inputtype="input" label='Top Banner Description' name='topBannerDescription' value={topBannerDescription} onChange={handleChange}/>
                        <Flex>
                            <Input inputtype="input" label='Top Banner Button Text' name='topBannerName' value={topBannerName} onChange={handleChange}/>
                            <Input inputtype="select" label='Top Banner Link (eg. /contact)' name='topBannerLink' value={topBannerLink} items={props.availableRoutes} onSelectChange={handleChange}/>
                        </Flex>
                      </Box>
                    }
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
                {props.stateBackup &&
                    <Button margin="2px 20px 15px 20px" onClick={props.cancelUpdate} >Undo Changes</Button>
                }
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
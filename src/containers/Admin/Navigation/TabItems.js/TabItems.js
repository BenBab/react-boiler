import React from 'react'
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

import Input from '../../../../components/UI/Input';
import TabMenu from '../TabsMenu';
import Button from '../../../../components/UI/Buttons/Button';
import Flex from '../../../../components/UI/Wrappers/Flex';
import Box from '../../../../components/UI/Wrappers/Box';
import Spinner from '../../../../components/UI/Spinner';
import Minimizer from '../../../../components/UI/Wrappers/Minimizer';
 
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
        topPageImg, topBannerHalfwidth, topBannerTxtRightSide, topBannerTxtLightTheme, topBannerLogo, topBannerfade, topBannerTitle, topBannerSubtitle, topBannerDescription, topBannerBtnText, topBannerLink,
        midPageImg, midBannerHalfwidth, midBannerTxtRightSide, midBannerTxtLightTheme, midBannerLogo, midBannerfade, midBannerTitle, midBannerSubtitle, midBannerDescription, midBannerBtnText, midBannerLink,
        bottomPageImg,
        mainText
    } = props.itemProps.content

    return (
        <Paper elevation={20}>
            <StyledTabItems>
              <div>
                {props.children}
                <Input inputtype="inputSelector" label='Top Banner Image' name="topPageImg" value={topPageImg} onChange={handleChange} onClick={handleMediaModal} />
                {topPageImg && 
                    <Minimizer >
                      <Box>
                        <Flex>
                            <Input inputtype="checkbox" sideLabel="Banner Image Halfwidth" name='topBannerHalfwidth' checked={topBannerHalfwidth} handleChange={handleCheckbox}/>
                            <Input inputtype="checkbox" sideLabel="Banner Text Right Side" name='topBannerTxtRightSide' checked={topBannerTxtRightSide} handleChange={handleCheckbox}/>
                            <Input inputtype="checkbox" sideLabel="Banner Light Text Color" name='topBannerTxtLightTheme' checked={topBannerTxtLightTheme} handleChange={handleCheckbox}/>
                        </Flex>
                        <Flex>
                            <Input inputtype="checkbox" sideLabel="Use Logo in banner" name='topBannerLogo' checked={topBannerLogo} handleChange={handleCheckbox}/>
                            <Input inputtype="checkbox" sideLabel="Banner content fade in effect" name='topBannerfade' checked={topBannerfade} handleChange={handleCheckbox}/>
                        </Flex>
                        <Input inputtype="input" label='Top Banner Title' name='topBannerTitle' value={topBannerTitle} onChange={handleChange}/> 
                        <Input inputtype="input" label='Top Banner Subtitle' name='topBannerSubtitle' value={topBannerSubtitle} onChange={handleChange}/>
                        <Input inputtype="input" label='Top Banner Description' name='topBannerDescription' value={topBannerDescription} onChange={handleChange}/>
                        <Flex>
                            <Input inputtype="input" label='Top Banner Button Text' name='topBannerBtnText' value={topBannerBtnText} onChange={handleChange}/>
                            <Input inputtype="select" label='Top Banner Link (eg. /contact)' name='topBannerLink' value={topBannerLink} items={props.availableRoutes} onSelectChange={handleChange}/>
                        </Flex>
                      </Box>
                    </Minimizer>
                }
                <Input inputtype="inputSelector" label='Middle Banner Image' name="midPageImg" value={midPageImg} onChange={handleChange} onClick={handleMediaModal} />
                {midPageImg && 
                    <Minimizer>
                      <Box>
                        <Flex>
                            <Input inputtype="checkbox" sideLabel="Banner Image Halfwidth" name='midBannerHalfwidth' checked={midBannerHalfwidth} handleChange={handleCheckbox}/>
                            <Input inputtype="checkbox" sideLabel="Banner Text Right Side" name='midBannerTxtRightSide' checked={midBannerTxtRightSide} handleChange={handleCheckbox}/>
                            <Input inputtype="checkbox" sideLabel="Banner Light Text Color" name='midBannerTxtLightTheme' checked={midBannerTxtLightTheme} handleChange={handleCheckbox}/>
                        </Flex>
                        <Flex>
                            <Input inputtype="checkbox" sideLabel="Use Logo in banner" name='midBannerLogo' checked={midBannerLogo} handleChange={handleCheckbox}/>
                            <Input inputtype="checkbox" sideLabel="Banner content fade in effect" name='midBannerfade' checked={midBannerfade} handleChange={handleCheckbox}/>
                        </Flex>
                        <Input inputtype="input" label='Middle Banner Title' name='midBannerTitle' value={midBannerTitle} onChange={handleChange}/> 
                        <Input inputtype="input" label='Middle Banner Subtitle' name='midBannerSubtitle' value={midBannerSubtitle} onChange={handleChange}/>
                        <Input inputtype="input" label='Middle Banner Description' name='midBannerDescription' value={midBannerDescription} onChange={handleChange}/>
                        <Flex>
                            <Input inputtype="input" label='Middle Banner Button Text' name='midBannerBtnText' value={midBannerBtnText} onChange={handleChange}/>
                            <Input inputtype="select" label='Middle Banner Link (eg. /contact)' name='midBannerLink' value={midBannerLink} items={props.availableRoutes} onSelectChange={handleChange}/>
                        </Flex>
                      </Box>
                    </Minimizer>
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
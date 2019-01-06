import React, { Component } from 'react';
import { siteName } from '../../../App_config';
import styled from 'styled-components'

import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Buttons/Button';
import Flex from '../../../components/UI/Wrappers/Flex';
import Box from '../../../components/UI/Wrappers/Box';
import Spinner from '../../../components/UI/Spinner';
import Minimizer from '../../../components/UI/Wrappers/Minimizer';

import Dashboard from '../../Dashboard/Dashboard'


class Homepage extends Component {

    state={
        previewOpen: false
    }

    handleChange = (event) =>{
        event.preventDefault();
        this.props.changeHomepageState(event.target, 'home', null, )
    }

    handlesubmit = (event) => {
        event.preventDefault();
        const url = `/${siteName}/home/content`
        this.props.homepageChangeSubmit(url, this.props.homePage.content )
    }

    handleCheckbox = check => event => {
        console.log(check , event.target.checked)
        const newevent =  {
            name: event.target.name,
            value: event.target.checked
        }
        this.props.changeHomepageState(newevent, 'home', null, )
    };

    handleMediaModal = (event) => {
        event.preventDefault();
        this.props.openMediaModal(event.target, 'home', null)
    }

    handleColourPicker = (event) => {
        this.props.changeHomepageState(event.target, 'home', null, )
    }

    clearInput = (inputName) => {
        const event = { name: inputName, value: '' }
        this.props.changeHomepageState(event, 'home', null, )
    }
    
    
    render() {
        if (!this.props.homePage)return <div></div>;

        const {
            topBanner, topBannerHalfwidth, topBannerImgSize, topBannerHWbackImg, topBannerHWBackColour, topBannerTxtRightSide, topBannerTxtLightTheme, topBannerLogo, topBannerfade, topBannerTitle, topBannerSubtitle, topBannerDescription, topBannerBtnText, topBannerLink,
            midBanner, midBannerHalfwidth, midBannerImgSize, midBannerHWbackImg, midBannerHWBackColour, midBannerTxtRightSide, midBannerTxtLightTheme, midBannerLogo, midBannerfade, midBannerTitle, midBannerSubtitle, midBannerDescription, midBannerBtnText, midBannerLink,
            bottomBanner,
            mainText
        } = this.props.homePage.content
        console.log('Homepage Props', this.props)

        return (
            <div className='fullwidth'>
            <StyledHomePage>
            <div>
              <Input inputtype="inputSelector" label={`${topBannerHalfwidth ? 'Top Banner Image (Inside Banner)' : 'Top Banner Image'}`} name="topBanner" value={topBanner} onChange={this.handleChange} onClick={this.handleMediaModal} clearInput={this.clearInput} />
              {topBanner && 
                  <Minimizer >
                    <Box>
                      <Flex>
                          <Input inputtype="checkbox" sideLabel="Use the Top Banner image inside the Banner " name='topBannerHalfwidth' checked={topBannerHalfwidth} handleChange={this.handleCheckbox}/>
                      </Flex>
                        {topBannerHalfwidth &&
                          <>
                            <Input inputtype="inputSelector" label='Banner Background Image' name="topBannerHWbackImg" value={topBannerHWbackImg} onChange={this.handleChange} onClick={this.handleMediaModal} clearInput={this.clearInput} />
                            <Flex>
                                <Input inputtype="input" type='number' label='Banner Image Size' name='topBannerImgSize' value={topBannerImgSize} onChange={this.handleChange}/>
                                <Input inputtype="inputColourPicker" label='Banner Background Colour' name='topBannerHWBackColour' value={topBannerHWBackColour} changeColour={this.handleColourPicker} pageId={'home'}/>
                            </Flex>
                          </>
                        }
                      <Flex>
                          <Input inputtype="checkbox" sideLabel="Banner Text Right Side" name='topBannerTxtRightSide' checked={topBannerTxtRightSide} handleChange={this.handleCheckbox}/>
                          <Input inputtype="checkbox" sideLabel="Banner Light Text Color" name='topBannerTxtLightTheme' checked={topBannerTxtLightTheme} handleChange={this.handleCheckbox}/>
                      </Flex>
                      <Flex>
                          <Input inputtype="checkbox" sideLabel="Use Logo in banner" name='topBannerLogo' checked={topBannerLogo} handleChange={this.handleCheckbox}/>
                          <Input inputtype="checkbox" sideLabel="Banner content fade in effect" name='topBannerfade' checked={topBannerfade} handleChange={this.handleCheckbox}/>
                      </Flex>
                      <Input inputtype="input" label='Banner Title' name='topBannerTitle' value={topBannerTitle} onChange={this.handleChange}/> 
                      <Input inputtype="input" label='Banner Subtitle' name='topBannerSubtitle' value={topBannerSubtitle} onChange={this.handleChange}/>
                      <Input inputtype="input" label='Banner Description' name='topBannerDescription' value={topBannerDescription} onChange={this.handleChange}/>
                      <Flex>
                          <Input inputtype="input" label='Banner Button Text' name='topBannerBtnText' value={topBannerBtnText} onChange={this.handleChange}/>
                          <Input inputtype="select" label='Banner Link' name='topBannerLink' value={topBannerLink} items={this.props.availableRoutes} onSelectChange={this.handleChange}/>
                      </Flex>
                    </Box>
                  </Minimizer>
              }
              <Input inputtype="inputSelector" label={`${midBannerHalfwidth ? 'Middle Banner Image (Inside Banner)' : 'Middle Banner Image'}`} name="midBanner" value={midBanner} onChange={this.handleChange} onClick={this.handleMediaModal} clearInput={this.clearInput}/>
              {midBanner && 
                  <Minimizer >
                    <Box>
                      <Flex>
                          <Input inputtype="checkbox" sideLabel="Use the Middle Banner image inside the Banner" name='midBannerHalfwidth' checked={midBannerHalfwidth} handleChange={this.handleCheckbox}/>
                      </Flex>
                        {midBannerHalfwidth &&
                          <>
                            <Input inputtype="inputSelector" label='Banner Background Image' name="midBannerHWbackImg" value={midBannerHWbackImg} onChange={this.handleChange} onClick={this.handleMediaModal} clearInput={this.clearInput} />
                            <Flex>
                                <Input inputtype="input" type='number' label='Banner Image Size' name='midBannerImgSize' value={midBannerImgSize} onChange={this.handleChange}/>
                                <Input inputtype="inputColourPicker" label='Banner Background Colour' name='midBannerHWBackColour' value={midBannerHWBackColour} changeColour={this.handleColourPicker} pageId={'home'}/>
                            </Flex>
                          </>
                        }
                      <Flex>
                          <Input inputtype="checkbox" sideLabel="Banner Text Right Side" name='midBannerTxtRightSide' checked={midBannerTxtRightSide} handleChange={this.handleCheckbox}/>
                          <Input inputtype="checkbox" sideLabel="Banner Light Text Color" name='midBannerTxtLightTheme' checked={midBannerTxtLightTheme} handleChange={this.handleCheckbox}/>
                      </Flex>
                      <Flex>
                          <Input inputtype="checkbox" sideLabel="Use Logo in banner" name='midBannerLogo' checked={midBannerLogo} handleChange={this.handleCheckbox}/>
                          <Input inputtype="checkbox" sideLabel="Banner content fade in effect" name='midBannerfade' checked={midBannerfade} handleChange={this.handleCheckbox}/>
                      </Flex>
                      <Input inputtype="input" label='Banner Title' name='midBannerTitle' value={midBannerTitle} onChange={this.handleChange}/> 
                      <Input inputtype="input" label='Banner Subtitle' name='midBannerSubtitle' value={midBannerSubtitle} onChange={this.handleChange}/>
                      <Input inputtype="input" label='Banner Description' name='midBannerDescription' value={midBannerDescription} onChange={this.handleChange}/>
                      <Flex>
                          <Input inputtype="input" label='Banner Button Text' name='midBannerBtnText' value={midBannerBtnText} onChange={this.handleChange}/>
                          <Input inputtype="select" label='Banner Link' name='midBannerLink' value={midBannerLink} items={this.props.availableRoutes} onSelectChange={this.handleChange}/>
                      </Flex>
                    </Box>
                  </Minimizer>
              }
              <Input inputtype="textarea" label='Main Body Text' name='mainText' value={mainText} onChange={this.handleChange}/>
            </div>
            <Preview>
                {/* <div className='overlay-blocker'></div> */}
                <Dashboard pageInfo={this.props.homePage} {...this.props} template={this.props.template} />
            </Preview>
          </StyledHomePage>
          <Flex justifyContent='flex-start'>
              <Button margin="2px 5px 15px 20px" onClick={this.handlesubmit}>Update</Button>
              {this.props.isUpdating &&
                  <Spinner/>
              }
              {this.props.stateBackup &&
                  <Button margin="2px 20px 15px 20px" onClick={this.props.cancelUpdate} >Undo Changes</Button>
              }
          </Flex>
          </div>
        );
    }
}


const Preview = styled.div`
    display:block;
    zoom: 30%;
    padding-top: 56px;
    box-shadow: 2px 2px 2px;

    .overlay-blocker{
        background: transparent;
        width: 30%;
        height: 86%;
        z-index: 100;
        position: absolute;
        top: 20px;
    }

    @media (max-width: 500px) {
        display:none
    }
`;


const StyledHomePage = styled.div`
    padding: 3vh;
    display: grid;
    grid-gap:8px;
    grid-template-columns: 65% 35%;
`;

export default Homepage;
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
    
    
    render() {
        if (!this.props.homePage)return <div></div>;

        const {
            topBanner, topBannerHalfwidth, topBannerTxtRightSide, topBannerTxtLightTheme, topBannerLogo, topBannerfade, topBannerTitle, topBannerSubtitle, topBannerDescription, topBannerBtnText, topBannerLink,
            midBanner, midBannerHalfwidth, midBannerTxtRightSide, midBannerTxtLightTheme, midBannerLogo, midBannerfade, midBannerTitle, midBannerSubtitle, midBannerDescription, midBannerBtnText, midBannerLink,
            bottomBanner,
            mainText
        } = this.props.homePage.content
        console.log('Homepage Props', this.props)

        return (
            <div className='fullwidth'>
            <StyledHomePage>
            <div>
              <Input inputtype="inputSelector" label='Top Banner Image' name="topBanner" value={topBanner} onChange={this.handleChange} onClick={this.handleMediaModal} />
              {topBanner && 
                  <Minimizer >
                    <Box>
                      <Flex>
                          <Input inputtype="checkbox" sideLabel="Banner Image Halfwidth" name='topBannerHalfwidth' checked={topBannerHalfwidth} handleChange={this.handleCheckbox}/>
                          <Input inputtype="checkbox" sideLabel="Banner Text Right Side" name='topBannerTxtRightSide' checked={topBannerTxtRightSide} handleChange={this.handleCheckbox}/>
                          <Input inputtype="checkbox" sideLabel="Banner Light Text Color" name='topBannerTxtLightTheme' checked={topBannerTxtLightTheme} handleChange={this.handleCheckbox}/>
                      </Flex>
                      <Flex>
                          <Input inputtype="checkbox" sideLabel="Use Logo in banner" name='topBannerLogo' checked={topBannerLogo} handleChange={this.handleCheckbox}/>
                          <Input inputtype="checkbox" sideLabel="Banner content fade in effect" name='topBannerfade' checked={topBannerfade} handleChange={this.handleCheckbox}/>
                      </Flex>
                      <Input inputtype="input" label='Top Banner Title' name='topBannerTitle' value={topBannerTitle} onChange={this.handleChange}/> 
                      <Input inputtype="input" label='Top Banner Subtitle' name='topBannerSubtitle' value={topBannerSubtitle} onChange={this.handleChange}/>
                      <Input inputtype="input" label='Top Banner Description' name='topBannerDescription' value={topBannerDescription} onChange={this.handleChange}/>
                      <Flex>
                          <Input inputtype="input" label='Top Banner Button Text' name='topBannerBtnText' value={topBannerBtnText} onChange={this.handleChange}/>
                          <Input inputtype="select" label='Top Banner Link' name='topBannerLink' value={topBannerLink} items={this.props.availableRoutes} onSelectChange={this.handleChange}/>
                      </Flex>
                    </Box>
                  </Minimizer>
              }
              <Input inputtype="inputSelector" label='Middle Banner Image' name="midBanner" value={midBanner} onChange={this.handleChange} onClick={this.handleMediaModal} />
              {midBanner && 
                  <Minimizer>
                    <Box>
                      <Flex>
                          <Input inputtype="checkbox" sideLabel="Banner Image Halfwidth" name='midBannerHalfwidth' checked={midBannerHalfwidth} handleChange={this.handleCheckbox}/>
                          <Input inputtype="checkbox" sideLabel="Banner Text Right Side" name='midBannerTxtRightSide' checked={midBannerTxtRightSide} handleChange={this.handleCheckbox}/>
                          <Input inputtype="checkbox" sideLabel="Banner Light Text Color" name='midBannerTxtLightTheme' checked={midBannerTxtLightTheme} handleChange={this.handleCheckbox}/>
                      </Flex>
                      <Flex>
                          <Input inputtype="checkbox" sideLabel="Use Logo in banner" name='midBannerLogo' checked={midBannerLogo} handleChange={this.handleCheckbox}/>
                          <Input inputtype="checkbox" sideLabel="Banner content fade in effect" name='midBannerfade' checked={midBannerfade} handleChange={this.handleCheckbox}/>
                      </Flex>
                      <Input inputtype="input" label='Middle Banner Title' name='midBannerTitle' value={midBannerTitle} onChange={this.handleChange}/> 
                      <Input inputtype="input" label='Middle Banner Subtitle' name='midBannerSubtitle' value={midBannerSubtitle} onChange={this.handleChange}/>
                      <Input inputtype="input" label='Middle Banner Description' name='midBannerDescription' value={midBannerDescription} onChange={this.handleChange}/>
                      <Flex>
                          <Input inputtype="input" label='Middle Banner Button Text' name='midBannerBtnText' value={midBannerBtnText} onChange={this.handleChange}/>
                          <Input inputtype="select" label='Middle Banner Link' name='midBannerLink' value={midBannerLink} items={this.props.availableRoutes} onSelectChange={this.handleChange}/>
                      </Flex>
                    </Box>
                  </Minimizer>
              }
              <Input inputtype="textarea" label='Main Body Text' name='mainText' value={mainText} onChange={this.handleChange}/>
            </div>
            <Preview>
                <div className='overlay-blocker'></div>
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
    padding: 5%;
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
    grid-template-columns: 65% 35%;
`;

export default Homepage;
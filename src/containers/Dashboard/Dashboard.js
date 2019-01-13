import React, { Component } from 'react'
import styled from 'styled-components'

import BannerFullwidth from '../../components/UI/Banners/Banner_fullWidth';
import BannerHalfwidth from '../../components/UI/Banners/Banner_halfwidth';
import MainBanner from '../../components/UI/Banners/Main_Banner';

import ContactUs from './Plugins/ContactUs';
class Dashboard extends Component {
  
  render() {
    console.log('dashboard props' , this.props)
    const { pageInfo, plugins, overlayBlocker } = this.props
    if ( !pageInfo ) {return <div> loading...</div>}
    if ( !pageInfo.content ) {return <div>No page content available</div>}
    
    const {
      topBanner, topBannerHalfwidth, topBannerImgSize, topBannerHWbackImg, topBannerHWBackColour, topBannerTxtRightSide, topBannerTxtLightTheme, topBannerLogo, topBannerfade, topBannerTitle, topBannerSubtitle, topBannerDescription, topBannerBtnText, topBannerLink,
      midBanner, midBannerHalfwidth, midBannerImgSize, midBannerHWbackImg, midBannerHWBackColour, midBannerTxtRightSide, midBannerTxtLightTheme, midBannerLogo, midBannerfade, midBannerTitle, midBannerSubtitle, midBannerDescription, midBannerBtnText, midBannerLink,
      mainText, mainTextPosition, mainTextCenterTitle, mainTextRightSide, mainTextBackColour, mainTextImg, mainTextImgAlign, mainTextImgWidth, mainTextImgHeight
  } = this.props.pageInfo.content

    const topBannerObj = { img: topBanner, halfwidth: topBannerHalfwidth, hwBannerImgSize: topBannerImgSize, hwBannerBackGroundImg: topBannerHWbackImg, backGroundColour: topBannerHWBackColour, textRightSide: topBannerTxtRightSide, lightTheme: topBannerTxtLightTheme, isLogo: topBannerLogo, fadeContent: topBannerfade, title: topBannerTitle, subTitle: topBannerSubtitle, description: topBannerDescription, btnText: topBannerBtnText, btnLink: topBannerLink }
    const midBannerObj = { img: midBanner, halfwidth: midBannerHalfwidth, hwBannerImgSize: midBannerImgSize, hwBannerBackGroundImg: midBannerHWbackImg, backGroundColour: midBannerHWBackColour, textRightSide: midBannerTxtRightSide, lightTheme: midBannerTxtLightTheme, isLogo: midBannerLogo, fadeContent: midBannerfade, title: midBannerTitle, subTitle: midBannerSubtitle, description: midBannerDescription, btnText: midBannerBtnText, btnLink: midBannerLink }
    
    const mainTextBannerObj = { mainText, position: mainTextPosition, centerTitle: mainTextCenterTitle, alignTextRight: mainTextRightSide, backgroundColour: mainTextBackColour, img: mainTextImg, imgAlign: mainTextImgAlign, imgWidth: mainTextImgWidth, imgHeight: mainTextImgHeight }
    const mainPosition = (mainTextPosition === undefined ? 'Top' : mainTextPosition);

    //PLUGINS
    let contactUs = null;
    if(plugins.contactUs && plugins.contactUs.contactUsPages){
      contactUs = plugins.contactUs.contactUsPages.find( page => {
        return pageInfo.route === page      
      })
    }

    return (
      <>
      {overlayBlocker &&
        <OverlayBlocker/>
      }
      <StyledDashboard transparentHeader={this.props.template.transparentHeader} topBanner={topBanner ? true : false}>
        {topBanner &&
          <>
          {topBannerHalfwidth
            ? ( <BannerHalfwidth bannerData={topBannerObj} history={this.props.history} template={this.props.template} position='top'/> )
            : ( <BannerFullwidth bannerData={topBannerObj} history={this.props.history} template={this.props.template} position='top'/> )
          }
          </>
        }

        {mainPosition === 'Top' &&
          <MainBanner bannerData={mainTextBannerObj}/>
        }
        
        {contactUs &&  <ContactUs/> }


        {midBanner &&
          <>
          { midBannerHalfwidth === true
          ? ( <BannerHalfwidth bannerData={midBannerObj} history={this.props.history} template={this.props.template} position='mid'/> )
          : ( <BannerFullwidth bannerData={midBannerObj} history={this.props.history} template={this.props.template} position='mid'/> )
          }
          </>
        }
        
        {mainPosition === 'Middle' &&
          <MainBanner bannerData={mainTextBannerObj} />
        }
      </StyledDashboard>
      </>
    )
  }
}

const StyledDashboard = styled.div`
    margin-top: ${props => props.transparentHeader ? '-75px' : 0};
    padding-top: ${props => !props.topBanner ? '150px' : 0};
`;

const OverlayBlocker = styled.div`
  position: absolute;
  width: 30%;
  height: 55%;
  z-index: 10;
  background-color: transparent;
  
`

export default Dashboard;

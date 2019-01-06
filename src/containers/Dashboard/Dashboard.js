import React, { Component } from 'react'
import styled from 'styled-components'

import BannerFullwidth from '../../components/UI/Banners/Banner_fullWidth'
import BannerHalfwidth from '../../components/UI/Banners/Banner_halfwidth'
class Dashboard extends Component {
  
  render() {
    console.log('dashboard props' , this.props)
    const { pageInfo } = this.props
    if ( !pageInfo ) {return <div> loading...</div>}
    const {
      topBanner, topBannerHalfwidth, topBannerImgSize, topBannerHWbackImg, topBannerHWBackColour, topBannerTxtRightSide, topBannerTxtLightTheme, topBannerLogo, topBannerfade, topBannerTitle, topBannerSubtitle, topBannerDescription, topBannerBtnText, topBannerLink,
            midBanner, midBannerHalfwidth, midBannerImgSize, midBannerHWbackImg, midBannerHWBackColour, midBannerTxtRightSide, midBannerTxtLightTheme, midBannerLogo, midBannerfade, midBannerTitle, midBannerSubtitle, midBannerDescription, midBannerBtnText, midBannerLink,
      mainText
  } = this.props.pageInfo.content

    const topBannerObj = { img: topBanner, halfwidth: topBannerHalfwidth, hwBannerImgSize: topBannerImgSize, hwBannerBackGroundImg: topBannerHWbackImg, backGroundColour: topBannerHWBackColour, textRightSide: topBannerTxtRightSide, lightTheme: topBannerTxtLightTheme, isLogo: topBannerLogo, fadeContent: topBannerfade, title: topBannerTitle, subTitle: topBannerSubtitle, description: topBannerDescription, btnText: topBannerBtnText, btnLink: topBannerLink }
    const midBannerObj = { img: midBanner, halfwidth: midBannerHalfwidth, hwBannerImgSize: midBannerImgSize, hwBannerBackGroundImg: midBannerHWbackImg, backGroundColour: midBannerHWBackColour, textRightSide: midBannerTxtRightSide, lightTheme: midBannerTxtLightTheme, isLogo: midBannerLogo, fadeContent: midBannerfade, title: midBannerTitle, subTitle: midBannerSubtitle, description: midBannerDescription, btnText: midBannerBtnText, btnLink: midBannerLink }

    return (
      <StyledDashboard transparentHeader={this.props.template.transparentHeader}>
        {topBanner &&
          topBannerHalfwidth
            ? ( <BannerHalfwidth bannerData={topBannerObj} history={this.props.history} template={this.props.template} position='top'/> )
            : ( <BannerFullwidth bannerData={topBannerObj} history={this.props.history} template={this.props.template} position='top'/> )
        }
        {midBanner &&
          midBannerHalfwidth === true
          ? ( <BannerHalfwidth bannerData={midBannerObj} history={this.props.history} template={this.props.template} position='mid'/> )
          : ( <BannerFullwidth bannerData={midBannerObj} history={this.props.history} template={this.props.template} position='mid'/> )
        }
        <div>{mainText}</div>

      </StyledDashboard>
    )
  }
}

const StyledDashboard = styled.div`
    margin-top: ${props => props.transparentHeader ? '-75px' : 0};
`;

export default Dashboard;

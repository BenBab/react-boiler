import React, { Component } from 'react'

import BannerFullwidth from '../../components/UI/Banners/Banner_fullWidth'
import BannerHalfwidth from '../../components/UI/Banners/Banner_halfwidth'
class Dashboard extends Component {
  
  render() {
    console.log('dashboard props' , this.props)
    const { pageInfo } = this.props
    if ( !pageInfo ) {return <div> loading...</div>}
    const {
      topBanner, topBannerHalfwidth, topBannerTxtRightSide, topBannerTxtLightTheme, topBannerLogo, topBannerfade,  topBannerTitle, topBannerSubtitle, topBannerDescription, topBannerBtnText, topBannerLink,
      midBanner, midBannerHalfwidth, midBannerTxtRightSide, midBannerTxtLightTheme, midBannerLogo, midBannerfade,  midBannerTitle, midBannerSubtitle, midBannerDescription, midBannerBtnText, midBannerLink,
      mainText
  } = this.props.pageInfo.content

    const topBannerObj = { img: topBanner, halfwidth: topBannerHalfwidth, textRightSide: topBannerTxtRightSide, lightTheme: topBannerTxtLightTheme, isLogo: topBannerLogo, fadeContent: topBannerfade, title: topBannerTitle, subTitle: topBannerSubtitle, description: topBannerDescription, btnText: topBannerBtnText, btnLink: topBannerLink }
    const midBannerObj = { img: midBanner, halfwidth: midBannerHalfwidth, textRightSide: midBannerTxtRightSide, lightTheme: midBannerTxtLightTheme, isLogo: midBannerLogo, fadeContent: midBannerfade, title: midBannerTitle, subTitle: midBannerSubtitle, description: midBannerDescription, btnText: midBannerBtnText, btnLink: midBannerLink }

    return (
      <div>
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

      </div>
    )
  }
}

export default Dashboard;

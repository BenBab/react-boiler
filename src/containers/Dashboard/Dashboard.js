import React, { Component } from 'react'

import BannerFullwidth from '../../components/UI/Banners/Banner_fullWidth'

class Dashboard extends Component {
  
  render() {
    console.log('dashboard props' , this.props)
    const { pageInfo } = this.props
    if ( !pageInfo ) {return <div> loading...</div>}
    const {
      topPageImg, topBannerHalfwidth, topBannerTxtRightSide, topBannerLogo, topBannerTitle, topBannerSubtitle, topBannerDescription, topBannerBtnText, topBannerLink,
      mainText
  } = this.props.pageInfo.content

    const topBannerObj = { img: topPageImg, halfwidth: topBannerHalfwidth, textRightSide: topBannerTxtRightSide, isLogo: topBannerLogo, title: topBannerTitle, subTitle: topBannerSubtitle, description: topBannerDescription, btnText: topBannerBtnText, btnLink: topBannerLink }

    return (
      <div>
        {/* {pageInfo.title} */}
        <BannerFullwidth bannerData={topBannerObj} history={this.props.history} template={this.props.template}/>
        <div>{mainText}</div>

      </div>
    )
  }
}

export default Dashboard;

import React, { Component } from 'react'

import BannerFullwidth from '../../components/UI/Banners/Banner_fullWidth'

class Dashboard extends Component {
  
  render() {
    console.log('dashboard props' , this.props)
    const { pageInfo } = this.props
    if ( !pageInfo ) {return <div> loading...</div>}

    return (
      <div>
        {pageInfo.title}
        <BannerFullwidth/>

      </div>
    )
  }
}

export default Dashboard;

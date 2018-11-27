import React, { Component } from 'react'

export default class Dashboard extends Component {
  
  render() {
    console.log('dashboard props' , this.props)
    const { pageInfo } = this.props
    if ( !pageInfo ) {return <div> loading...</div>}

    return (
      <div>
        {pageInfo.title}
      </div>
    )
  }
}

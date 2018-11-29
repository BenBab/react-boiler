import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
class Admin extends Component {
  
  componentDidMount() {
    if (!this.props.isAuthenticated){
      this.props.history.push('/authenticate-admin')
    }
  }

  componentDidUpdate(prevProps){
    if (prevProps.isAuthenticated && !this.props.isAuthenticated ){
      this.props.history.push('/authenticate-admin')
    }
  }

  logoutHandler = () => {
    this.props.onLogoutClick()
  }
  
  render() {
    console.log('Admin PAge props', this.props)
    return (
      <div>
        <div>
          Admin Page
        </div>
        <button onClick={this.logoutHandler}>logout</button>
        
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogoutClick: () => dispatch(actions.logout()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Admin)

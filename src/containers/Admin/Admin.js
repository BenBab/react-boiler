import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

import Accordian from '../../components/UI/Accordian'
import Tabs from '../../components/UI/Tabs/Tabs'
import Modal from '../../components/UI/Modal'
import NewPageForm from '../../components/Forms/NewPageForm'
class Admin extends Component {

  state = {
    newPageOpen : false,


  }
  
  // componentDidMount() {
  //   if (!this.props.isAuthenticated){
  //     this.props.history.push('/authenticate-admin')
  //   }
  // }

  // componentDidUpdate(prevProps){
  //   if (prevProps.isAuthenticated && !this.props.isAuthenticated ){
  //     this.props.history.push('/authenticate-admin')
  //   }
  // }

  logoutHandler = () => {
    this.props.onLogoutClick()
  }

  handleNewPageButton = () => {
    this.setState({newPageOpen : !this.state.newPageOpen})
  }
  
  render() {
    console.log('Admin Page props', this.props)
    return (
      <div>
        <div>
          Admin Page
        </div>
        <button onClick={this.logoutHandler}>logout</button>
        <Modal 
          open={this.state.newPageOpen}
          navigationItems={this.props.navigationItems} 
          handleClose={this.handleNewPageButton}
          title="Add a new Webpage"
          description="Here you can add a new page to your website which will show in the header navigation. You can also make the new page a subpage of another navigation link" >
          <NewPageForm navigationItems={this.props.navigationItems} />
        </Modal>
          <div>
            <Accordian title={'Homepage'}><div>hello</div></Accordian>
            <br/>
            <Accordian title='Header Navigation'>
            <div className="fullwidth">
              <button onClick={this.handleNewPageButton}>Add a new page</button>
              <br/><br/>
              <Tabs navigationItems={this.props.navigationItems}/>
              <br/>
            </div>
            
            </Accordian>
          </div>


      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    home: state.dashboard.home,
    navigationItems: state.dashboard.navigationItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogoutClick: () => dispatch(actions.logout()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Admin)

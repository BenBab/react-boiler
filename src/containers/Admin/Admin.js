import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { siteName } from '../../App_config';
import axios from 'axios';

import Accordian from '../../components/UI/Accordian';
import Tabs from '../../components/UI/Tabs/Tabs';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Buttons/Button';
import NewPageForm from '../../components/Forms/NewPageForm';
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

  handleNewPageButton = (event) => {
    event.preventDefault();
    this.setState({newPageOpen : !this.state.newPageOpen})
  }

  submitNewPage = (newPage_State) => {
    console.log('newPage_State', newPage_State);
    const { title, checked, selectVal } = newPage_State;
    const route = title.replace(/ /g,'-').toLowerCase();
    const defaultContent = {
      topPageImg: '',
      middlePageImg: '',
      bottomPageImg: '',
      mainText: `This is your newly added ${title} page`,
      middleText: ''
       
    }
    let url = `https://react-boiler-5ecbd.firebaseio.com/${siteName}/navigationItems`
    
    let newPageObj = {
      title,
      route,
      selected: false,
      content: defaultContent
    }
    
    if (checked){
      const subpageIndex = this.props.navigationItems.findIndex(page => page.title === selectVal);
      url = `https://react-boiler-5ecbd.firebaseio.com/${siteName}/navigationItems/${subpageIndex}`

      newPageObj = {
        title,
        route,
        content: defaultContent

      }
    }

    
    // axios.post(url, newPageObj)
    // .then(response => {
    //   console.log(response)

    //   // dispatch(authSuccess(response.data));
    //   // dispatch(checkAuthTimeout(response.data.expiresIn))
    // })
    // .catch(err => {
    //   console.log(err);
    //   // dispatch(authFail(err.response.data.error));
    // })
  }
  
  render() {
    console.log('Admin Page props', this.props)
    return (
      <div>
        <div>
          Admin Page
        </div>
        <button onClick={this.logoutHandler}>logout</button>
          <div>
            <Accordian title={'Homepage'}><div>hello</div></Accordian>
            <br/>
            <Accordian title='Header Navigation'>
            <div className="fullwidth">
              <Button onClick={this.handleNewPageButton}>Add a new page</Button>
              <Modal 
                open={this.state.newPageOpen}
                navigationItems={this.props.navigationItems}
                handleClose={this.handleNewPageButton} 
                title="Add a new Webpage"
                description="Here you can add a new page to your website which will show in the header navigation. You can also make the new page a subpage of another navigation link" >
                <NewPageForm
                  navigationItems={this.props.navigationItems} 
                  handleClose={this.handleNewPageButton} 
                  handleSubmit={this.submitNewPage} />
              </Modal>
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

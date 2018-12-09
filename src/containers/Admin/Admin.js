import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { siteName } from '../../App_config';
import axios from 'axios';

import Accordian from '../../components/UI/Accordian';
import Tabs from '../../components/UI/Tabs/Tabs';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Buttons/Button';
import Toast from '../../components/UI/Toast';

import NewPageForm from '../../components/Forms/NewPageForm';
class Admin extends Component {

  state = {
    newPageOpen : false,
    loading: false,
    error: null,
    newPageToast: null


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
    const { navigationItems } = this.props

    const route = title.replace(/ /g,'-').toLowerCase();
    const defaultContent = {
      topPageImg: '',
      middlePageImg: '',
      bottomPageImg: '',
      mainText: `This is your newly added ${title} page`,
      middleText: ''
       
    }
    let url = `https://react-boiler-5ecbd.firebaseio.com/${siteName}/navigationItems.json`
    
    let newPageObj = {
      title,
      route,
      selected: false,
      content: defaultContent
    }
    
    if (checked){
      // const subpageIndex = this.props.navigationItems.findIndex(page => page.title === selectVal);
      let subpageIndex = null
      for ( let key in navigationItems){
        if (navigationItems[key].title === selectVal ){
          subpageIndex = key
        }
      }

      url = `https://react-boiler-5ecbd.firebaseio.com/${siteName}/navigationItems/${subpageIndex}/dropdownPages.json`

      newPageObj = {
        title,
        route,
        content: defaultContent

      }
    }
    
    this.setState({ loading: true, error: null}, () => {
      axios.post(url, newPageObj)
        .then(response => {
          console.log(response)
          this.props.onInitWebsiteState()
        })
        .then(() =>{
          this.setState({loading: false, error: null, newPageOpen: false, newPageToast: 'New Page added successfully' })
        })
        .then(() => {
          setTimeout(() => { 
              this.setState({newPageToast: null}); 
          }, 7000 );
        })
        .catch(err => {
          console.log(err);
          this.setState({loading: false, error: err})
        })
      }
    )
  }

  // this.props.addPage(url, newPageObj)
  
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
                  loading = {this.state.loading}
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
          { this.state.newPageToast !== null &&
            <Toast message={this.state.newPageToast} />
          }

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
    addPage: (pageInfo, url) => dispatch(actions.addNewPage( pageInfo, url )),
    onInitWebsiteState: () => dispatch(actions.initWebsiteState()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Admin)

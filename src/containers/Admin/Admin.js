import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { siteName, URL_PREFIX } from '../../App_config';
import axios from 'axios';
import firebase from'firebase';

import Accordian from '../../components/UI/Accordian';
import Tabs from '../../components/UI/Tabs/Tabs';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Buttons/Button';
import Toast from '../../components/UI/Toast';

import NewPageForm from '../../components/Forms/NewPageForm';
import Media from './media/Media'
import AuthModal from '../Auth/AuthModal'
class Admin extends Component {

  state = {
    showSignIn : false,
    newPageOpen : false,
    newPageToast: null,
    loading: false,
    error: null,
    

  }
  
  componentDidMount() {
    // if (!this.props.isAuthenticated){
    //   this.props.history.push('/authenticate-admin')
    // }

    const user = firebase.auth().currentUser;

    
      if (user) {
          // User is signed in.
          console.log('user is signed in')
      } else {
          // No user is signed in.
          console.log(' No user is signed in.')
              // firebase.auth().signInWithCustomToken(token).catch(function(error) {
              //     // Handle Errors here.
              //     var errorCode = error.code;
              //     var errorMessage = error.message;
              //     // ...
              // });
     }
  
  }

  // componentDidUpdate(prevProps){
  //   if (prevProps.isAuthenticated && !this.props.isAuthenticated ){
  //     this.props.history.push('/authenticate-admin')
  //   }
  // }

  logoutHandler = () => {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
    });
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
    let url = `${URL_PREFIX}/${siteName}/navigationItems.json`
    
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

      url = `${URL_PREFIX}/${siteName}/navigationItems/${subpageIndex}/dropdownPages.json`

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

  updatePage(eventTarget, key, parent){
    console.log(eventTarget.value, key, parent)
    this.props.onChangePageState(eventTarget, key, parent)
  }

  updatePageSubmit(pageInfo, key, parentKey){
    console.log(pageInfo, key, parentKey)
    
    const URL = !parentKey
      ? `${URL_PREFIX}/${siteName}/navigationItems/${key}/content.json`
      : `${URL_PREFIX}/${siteName}/navigationItems/${parentKey}/dropdownPages/${key}/content.json`

    this.props.onUpdatePageSubmit(URL, pageInfo)

    // axios.put(URL, pageInfo)
    //   .then( response => {
    //     console.log(response)
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     // this.setState({loading: false, error: err})
    //   })
  }

  timedOutUser = (value) => {
  this.setState({ showSignIn : value })

  }

  // this.props.addPage(url, newPageObj)
  
  render() {
    console.log('Admin Page props', this.props)
    return (
      <div>
        <div>
          Admin Page
        </div>
        <Modal
           open={this.state.showSignIn}
           title="You have been logged out"
           description="Your administrator session has expired you will need to log back in to continue"
           >
            <AuthModal history={this.props.history} isTimedOut={this.timedOutUser}/>
        </Modal>
        <Button onClick={this.logoutHandler}>logout</Button>
          <div>
            <Accordian title={'Media'}>
            <Media 
              isTimedOut={this.timedOutUser} 
              currentImages={this.props.images}
              refreshState={this.props.onInitWebsiteState}/>
            </Accordian>
            <br/>
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
              <Tabs 
                navigationItems={this.props.navigationItems} 
                updatePageSubmit={this.updatePageSubmit.bind(this)} 
                onChange={this.updatePage.bind(this)}
                isUpdating={this.props.isUpdating}
                cancelUpdate={this.props.onRevertChanges}
                />
              <br/>
            </div>
            
            </Accordian>
          </div>
          { this.state.newPageToast !== null &&
            <Toast message={this.state.newPageToast} />
          }
          { this.props.updatePageToast !== null &&
            <Toast message={this.props.updatePageToast} />
          }

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.userId !== null,
    userId: state.auth.userId,
    home: state.mainState.home,
    navigationItems: state.mainState.navigationItems,
    images: state.mainState.images,
    updatePageToast : state.admin.pageUpdateToast,
    isUpdating : state.admin.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitWebsiteState: () => dispatch(actions.initWebsiteState()),
    onLogoutClick: () => dispatch(actions.logout()),
    onChangePageState: (eventTarget, key, parent) => dispatch(actions.changePageState(eventTarget, key, parent)),
    onUpdatePageSubmit: (pageInfo, url) => dispatch(actions.updatePageSubmit( pageInfo, url )),
    onRevertChanges: () => dispatch(actions.revertStateChange()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Admin)

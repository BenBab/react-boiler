import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { siteName, URL_PREFIX } from '../../App_config';
import axios from 'axios';
import firebase from'firebase';
import styled from 'styled-components'

import Accordian from '../../components/UI/Accordian';
import TabsMenu from './Navigation/TabsMenu';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Buttons/Button';
import Toast from '../../components/UI/Toast';
import Flex from '../../components/UI/Wrappers/Flex'

import NewPageForm from '../../components/Forms/NewPageForm';
import Media from './media/Media'
import AuthModal from '../Auth/AuthModal'
class Admin extends Component {

  state = {
    showSignIn : false,
    newPageOpen : false,
    openMediaModal: false,
    mediaModalTabItemRef: [],
    newPageToast: null,
    loading: false,
    error: null,
    mediaImages: []
    

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

  openMediaModal = (pageInfo, key, parentKey) => {
    console.log('opneMedia Modal', pageInfo, key, parentKey)
    this.setState({openMediaModal : true, mediaModalTabItemRef: [pageInfo, key, parentKey] })
  }
  
  closeMediaModal = () => {this.setState({openMediaModal : false })}

  setMediaImages = (mediaImages) => {
    this.setState({ mediaImages });
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
      topBannerTitle:'',
      topBannerSubtitle:'',
      topBannerDescription:'',
      topBannerButton:{ name: '', link:'' },
      middlePageImg: '',
      middleBannerTitle:'',
      middleBannerSubtitle:'',
      middleBannerDescription:'',
      middleBannerButton:{ name: '', link:'' },
      bottomPageImg: '',
      bottomBannerTitle:'',
      bottomBannerSubtitle:'',
      bottomBannerDescription:'',
      bottomBannerButton:{ name: '', link:'' },
      mainText: `This is your newly added ${title} page`,
      middleText: ''
    }
    let url = `/${siteName}/navigationItems`
    
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

      url = `/${siteName}/navigationItems/${subpageIndex}/dropdownPages`

      newPageObj = {
        title,
        route,
        content: defaultContent

      }
    }
    
    this.setState({ loading: true, error: null}, () => {
      const that = this;
      const newPostKey = firebase.database().ref().child(url).push().key;
      const newPage = {[newPostKey]: newPageObj }

      firebase.database().ref().child(url).update(newPage , function(err) {
        if (err) {
          // The write failed...
          that.setState({loading: false, error: err.code, newPageOpen: false, showSignIn: true})
        } else {
          // Data saved successfully!
          console.log('new page added successfully!')
          that.setState({loading: false, error: null, newPageOpen: false, newPageToast: 'New Page added successfully' })
          that.props.onInitWebsiteState()
        }

      // axios.post(url, newPageObj)
      //   .then(response => {
      //     console.log(response)
      //     this.props.onInitWebsiteState()
      //   })
      //   .then(() =>{
      //     this.setState({loading: false, error: null, newPageOpen: false, newPageToast: 'New Page added successfully' })
      //   })
      //   .then(() => {
      //     setTimeout(() => { 
      //         this.setState({newPageToast: null}); 
      //     }, 7000 );
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     this.setState({loading: false, error: err.response.data.error, newPageOpen: false, showSignIn: true})
      })
    })
  }

  updatePage(eventTarget, key, parent){
    console.log(eventTarget.value, key, parent)
    this.props.onChangePageState(eventTarget, key, parent)
  }

  updatePageSubmit(pageInfo, key, parentKey){
    console.log(pageInfo, key, parentKey)
    
    const URL = !parentKey
      ? `/${siteName}/navigationItems/${key}/content`
      : `/${siteName}/navigationItems/${parentKey}/dropdownPages/${key}/content`

    const user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      console.log('user is signed in')
      this.props.onUpdatePageSubmit(URL, pageInfo)
    } else {
      // No user is signed in.
      console.log(' No user is signed in.')
      this.setState({ showSignIn : true, error: 'Permission denied. Please sign in again to Re-authenticate' })
 }


  }

  timedOutUser = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      // User is signed in
      this.setState({ showSignIn : false })
    } else {
      // No user is signed in.
      console.log(' No user is signed in.')
      this.setState({ showSignIn : true })
 }




  }

  // this.props.addPage(url, newPageObj)
  
  render() {

    console.log('Admin Page props', this.props)
    return (
      <StyledAdminPage>
        <Flex justifyContent='space-between'>
          <h1>
            Admin Page
          </h1>
          <Button onClick={this.logoutHandler}>logout</Button>
        </Flex>
        <Modal
           open={this.state.showSignIn}
           title="You have been logged out"
           description="Your administrator session has expired you will need to log back in to continue"
           >
            <AuthModal history={this.props.history} isTimedOut={this.timedOutUser}/>
        </Modal>
          <div>
            <Accordian title={'Media'}>
            <Media
              isAuthenticated={this.props.isAuthenticated} 
              isTimedOut={this.timedOutUser} 
              currentImages={this.props.images}
              refreshState={this.props.onInitWebsiteState}
              isModal={false}
              imageURLs={this.state.mediaImages}
              setMediaImages={this.setMediaImages}
              />
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
              <Modal
                open={this.state.openMediaModal}
                title="Choose an image"
                description="Select an image to use "
                handleClose={this.closeMediaModal}
              >
                <Media
                 isModal={true}
                 isAuthenticated={this.props.isAuthenticated}  
                 handleClose={this.closeMediaModal}
                 currentImages={this.props.images} 
                 imageURLs={this.state.mediaImages}
                 setMediaImages={this.setMediaImages} 
                 tabItemReference={this.state.mediaModalTabItemRef}
                 onChangePageState={this.props.onChangePageState}
                 />
              </Modal>

              <br/><br/>
              <TabsMenu 
                navigationItems={this.props.navigationItems} 
                updatePageSubmit={this.updatePageSubmit.bind(this)} 
                onChange={this.updatePage.bind(this)}
                openMediaModal={this.openMediaModal}
                isUpdating={this.props.isUpdating}
                cancelUpdate={this.props.onRevertChanges}
                isError={this.props.isError}
                stateBackup={this.props.stateBackup}
                availableRoutes={this.props.availableRoutes}
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
          { this.state.error &&
            <Toast message={this.state.error} error={true} />
          }

      </StyledAdminPage>
    )
  }
}

const StyledAdminPage = styled.div `
  background-color : #424242;
  min-height: 100vh;
  padding: 50px;

  >div h1 {
    color: #F5F5F5;
  }

`;


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.userId !== null,
    userId: state.auth.userId,
    home: state.mainState.home,
    navigationItems: state.mainState.navigationItems,
    images: state.mainState.images,
    stateBackup: state.mainState.state_copy,
    updatePageToast : state.admin.pageUpdateToast,
    isUpdating : state.admin.loading,
    isError: state.admin.error,
    availableRoutes: state.admin.routes
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

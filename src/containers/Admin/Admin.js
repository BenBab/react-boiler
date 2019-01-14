import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { siteName } from '../../App_config';
import firebase from'firebase';
import styled from 'styled-components'

import Accordian from '../../components/UI/Accordian';
import TabsMenu from './Navigation/TabsMenu';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Buttons/Button';
import Toast from '../../components/UI/Toast';
import Flex from '../../components/UI/Wrappers/Flex'
import DeleteIcon from '@material-ui/icons/Delete';

import NewPageForm from '../../components/Forms/NewPageForm';
import Media from './media/Media';
import Template from './template/Template';
import Homepage from './homepage/Homepage';
import Plugins from './plugins/Plugins'
import AuthModal from '../Auth/AuthModal';

class Admin extends Component {

  state = {
    homepage_accordian: false,
    navigation_accordian: false,
    template_accordian: false,
    media_accordian: false,

    showSignIn : false,
    newPageOpen : false,
    deletePageModal: false,
    openMediaModal: false,
    mediaModalTabItemRef: [],
    newPageToast: null,
    loading: false,
    error: null,
    mediaImages: [],
    
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
      id: Date.now(),
      mainText: `This is your newly added ${title} page`,
    }
    let url = `/${siteName}/site/navigationItems`
    
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

      url = `/${siteName}/site/navigationItems/${subpageIndex}/dropdownPages`

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


  handleDeletePageModal = () => {
     this.setState({ deletePageModal : !this.state.deletePageModal })
  }

  submitDeletePage = () => {
    console.log('delete')
  }

  updatePage = (eventTarget, key, parent) => {
    console.log(eventTarget.value, key, parent)
    this.props.onChangePageState(eventTarget, key, parent)
  }

  updatePageSubmit = (pageInfo, key, parentKey) => {
    console.log(pageInfo, key, parentKey)
    
    const URL = !parentKey
      ? `/${siteName}/site/navigationItems/${key}/content`
      : `/${siteName}/site/navigationItems/${parentKey}/dropdownPages/${key}/content`

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

  accordianClick = (name) => {
    this.setState({ [name]: !this.state[name] })
  }

  // this.props.addPage(url, newPageObj)
  
  render() {

    console.log('Admin Page props', this.props)
    const { media_accordian, template_accordian, homepage_accordian, navigation_accordian, plugins_accordian } = this.state

    return (
      <StyledAdminPage>
        <Flex justifyContent='space-between'>
          <h1 className='admin-title'>
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
            
            <Accordian title={'Media'} name={'media_accordian'} onClick={(e) => this.accordianClick(e)}>
            {media_accordian &&
              <Media
                isAuthenticated={this.props.isAuthenticated} 
                isTimedOut={this.timedOutUser} 
                currentImages={this.props.images}
                refreshState={this.props.onInitWebsiteState}
                isModal={false}
                imageURLs={this.state.mediaImages}
                setMediaImages={this.setMediaImages}
              />
            }
            </Accordian>
            <br/>


            <Accordian title={'Template'} name={'template_accordian'} onClick={(e) => this.accordianClick(e)}>
              {template_accordian &&
                <Template
                  template={this.props.template} 
                  changeTemplateState={this.props.onChangePageState} 
                  templateChangeSubmit={this.props.onUpdatePageSubmit}
                  isUpdating={this.props.isUpdating}
                  isError={this.props.isError}
                  stateBackup={this.props.stateBackup}
                  cancelUpdate={this.props.onRevertChanges}
                  openMediaModal={this.openMediaModal}
                />
              }
            </Accordian>
            <br/>


            <Accordian title={'Homepage'} name={'homepage_accordian'} onClick={(e) => this.accordianClick(e)}>
              {homepage_accordian &&
              <Homepage 
                homePage={this.props.home}
                changeHomepageState={this.props.onChangePageState} 
                homepageChangeSubmit={this.props.onUpdatePageSubmit}
                isUpdating={this.props.isUpdating}
                isError={this.props.isError}
                stateBackup={this.props.stateBackup}
                cancelUpdate={this.props.onRevertChanges}
                openMediaModal={this.openMediaModal}
                availableRoutes={this.props.availableRoutes}
                template={this.props.template}
                plugins={this.props.plugins}
              />
              }
            </Accordian>
            <br/>

            <Accordian title='Navigation and Pages' name={'navigation_accordian'} onClick={(e) => this.accordianClick(e)}>
            {navigation_accordian &&
            <div className="fullwidth">
              <Flex justifyContent={'space-between'}>
              <Button onClick={this.handleNewPageButton}>Add a new page</Button>
              <Button onClick={this.handleDeletePageModal}>Delete page &nbsp; <DeleteIcon /></Button>
              </Flex>
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
                open={this.state.deletePageModal}
                navigationItems={this.props.navigationItems}
                handleClose={this.handleDeletePageModal} 
                title="Delete Webpage"
                description="You are about to delete selected page this is a permanent action, would you like to continue with deleting this page" >
                
                <Flex>
                  <Button onClick={this.submitDeletePage}>Delete &nbsp; <DeleteIcon /></Button>
                  <Button onClick={this.handleDeletePageModal}>Cancel</Button>
                </Flex>
                
              </Modal>


              <br/><br/>
              <TabsMenu 
                navigationItems={this.props.navigationItems} 
                updatePageSubmit={this.updatePageSubmit} 
                onChange={this.updatePage}
                openMediaModal={this.openMediaModal}
                isUpdating={this.props.isUpdating}
                cancelUpdate={this.props.onRevertChanges}
                isError={this.props.isError}
                stateBackup={this.props.stateBackup}
                availableRoutes={this.props.availableRoutes}
                template={this.props.template}
                plugins={this.props.plugins}
                />
              <br/>
            </div>
            }
            </Accordian>
            <br/>


            <Accordian title={'Plugins'} name={'plugins_accordian'} onClick={(e) => this.accordianClick(e)}>
            {plugins_accordian &&
              <Plugins
                plugins={this.props.plugins}
                changePluginState={this.props.onChangePageState}
                pluginsChangeSubmit={this.props.onUpdatePageSubmit}
                availableRoutes={this.props.availableRoutes}
                isUpdating={this.props.isUpdating}
                isError={this.props.isError}
                stateBackup={this.props.stateBackup}
                cancelUpdate={this.props.onRevertChanges}
      
              />
            }
            </Accordian>

            <Modal
                open={this.state.openMediaModal}
                title="Choose an image"
                description="Select the media location you would like to use"
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
  padding: 100px 50px;
  margin-top: -75px;

  .admin-title {
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
    availableRoutes: state.admin.routes,
    template: state.mainState.template,
    plugins: state.mainState.plugins,
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

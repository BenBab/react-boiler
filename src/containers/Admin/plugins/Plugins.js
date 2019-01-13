import React, { Component } from 'react'
import { siteName } from '../../../App_config'
import styled from 'styled-components'

import Spinner from '../../../components/UI/Spinner';
import Flex from '../../../components/UI/Wrappers/Flex';
import Button from '../../../components/UI/Buttons/Button'

import ContactUsSettings from './contactUsSettings/ContactUsSettings'


class Plugins extends Component {

  state = {
    contactUsPlugin: false,

  }

  accordianClick = (name) => {
    this.setState({ [name]: !this.state[name] })
  }

  handleChange = (event, parentObj) =>{
    //event.preventDefault();
    this.props.changePluginState(event.target, 'plugins', parentObj, )
  }

  handleCheckbox = (check, parentObj) => event => {
    console.log(check ,parentObj, event.target.checked)
    const newevent =  {
        name: event.target.name,
        value: event.target.checked
    }
    this.props.changePluginState(newevent, 'plugins', parentObj, )
  };

  handlesubmit = (event) => {
    event.preventDefault();
    const url = `/${siteName}/site/plugins`
    this.props.pluginsChangeSubmit(url, this.props.plugins )
  };

  render() {
    if (!this.props.plugins)return <div><Spinner/></div>;

    console.log('plugins props', this.props)

    let availableRoutes = this.props.availableRoutes.map( route => {
      const value = route.value === '/' ? 'home' : route.value
      let str = value.split("/").pop()
      return str
    })

    availableRoutes.unshift('All Pages')

    return (
      <div>
        <StyledPlugins>
          <ContactUsSettings 
            plugin={this.props.plugins.contactUs} 
            name={'contactUsPlugin'} 
            parentObj='contactUs'
            availableRoutes={availableRoutes}
            accordianClick={this.accordianClick}
            handleCheckbox={this.handleCheckbox} 
            handleChange={(e) => this.handleChange(e, 'contactUs')}
            />
        </StyledPlugins>
        <Flex justifyContent='flex-start'>
          <Button margin="2px 5px 15px 20px" onClick={this.handlesubmit}>Update</Button>
          {this.props.isUpdating &&
              <Spinner/>
            }
          {this.props.stateBackup &&
              <Button margin="2px 20px 15px 20px" onClick={this.props.cancelUpdate} >Undo Changes</Button>
            }
        </Flex>
      </div>
    )
  }
}


const StyledPlugins = styled.div`
    width: 100%;

`;
export default Plugins;
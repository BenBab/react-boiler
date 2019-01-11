import React, { Component } from 'react'
import styled from 'styled-components'

import Spinner from '../../../components/UI/Spinner';
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


  render() {
    if (!this.props.plugins)return <div><Spinner/></div>;

    console.log('plugins props', this.props)

    return (
      <StyledPlugins>
        <ContactUsSettings 
          plugin={this.props.plugins.contactUs} 
          name={'contactUsPlugin'} 
          parentObj='contactUs'
          availableRoutes={this.props.availableRoutes}
          accordianClick={this.accordianClick}
          handleCheckbox={this.handleCheckbox} 
          handleChange={(e) => this.handleChange(e, 'contactUs')}
        />
      </StyledPlugins>
    )
  }
}


const StyledPlugins = styled.div`
    width: 100%;

`;
export default Plugins;
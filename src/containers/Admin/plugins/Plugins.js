import React, { Component } from 'react'
import Accordian from '../../../components/UI/Accordian';

import Input from '../../../components/UI/Input'



class Plugins extends Component {

  handleCheckbox = check => event => {
    console.log(check , event.target.checked)
    const newevent =  {
        name: event.target.name,
        value: event.target.checked
    }
    //this.props.changePluginState(newevent, 'home', null, )
  };


  render() {

    const pluginContactUs = false

    return (
      <div>
        <Input inputtype="checkbox" sideLabel="Contact Us Plugin" name='pluginContactUs' parent={'contactUs'} checked={pluginContactUs} handleChange={this.handleCheckbox}/>
      </div>
    )
  }
}

export default Plugins;
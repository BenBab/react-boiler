import React, { Component } from 'react';
import { siteName } from '../../../App_config'

import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Buttons/Button';
import Flex from '../../../components/UI/Wrappers/Flex';
import Grid from '../../../components/UI/Wrappers/Grid';
import Spinner from '../../../components/UI/Spinner';

import styled from 'styled-components';

class ContactUs extends Component {
    state ={
        contactUsEmail: ''

    }

    handlechange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


   render(){

      return (
            <div>
                <Input inputtype='input' label='name' name='contactUsName' onChange={this.handlechange}/>
                <Input inputtype='input' label='email' name='contactUsEmail' onChange={this.handlechange}/>
                <Input inputtype='textarea' label='email' name='contactUsMessage' onChange={this.handlechange}/>
                                

            </div>
      )
   }
}

export default ContactUs;
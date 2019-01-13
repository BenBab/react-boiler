import React, { Component } from 'react';
import styled from 'styled-components'
import { siteName } from '../../../App_config'

import axios from 'axios'

import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Buttons/Button';
import Flex from '../../../components/UI/Wrappers/Flex';
import Grid from '../../../components/UI/Wrappers/Grid';
import Spinner from '../../../components/UI/Spinner';

class ContactUs extends Component {
    state ={
        contactUsName: '',
        contactUsEmail: '',
        contactUsMessage: ''

        
    }

    // handleSubmit = this.handleSubmit.bind(this);

    handlechange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { contactUsName, contactUsEmail, contactUsMessage } = this.state

        const form = await axios.post('api/form', {
            contactUsName,
            contactUsEmail,
            contactUsMessage,
        })
    }


   render(){

      return (
            <ContactForm>
                    <h1>Contact Us</h1>
                    <h4></h4>
                   
                        <Input inputtype='input' label='Name' name='contactUsName' onChange={this.handlechange}/>
                        <Input inputtype='input' label='Email' name='contactUsEmail' onChange={this.handlechange}/>
                        <Input inputtype='textarea' label='Message' name='contactUsMessage' onChange={this.handlechange}/>

                        <Button onClick={ this.handleSubmit.bind(this)}>Send</Button>
                    
            </ContactForm>
      )
   }
}


const ContactForm = styled.div`
    padding: 20px 10%;
`;

export default ContactUs;
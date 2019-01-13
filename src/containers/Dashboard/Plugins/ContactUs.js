import React, { Component } from 'react';
import styled from 'styled-components'
import { siteName } from '../../../App_config'

import axios from 'axios'

import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Buttons/Button';
import Toast from '../../../components/UI/Toast'
import Spinner from '../../../components/UI/Spinner'
import Flex from '../../../components/UI/Wrappers/Flex';


class ContactUs extends Component {
    state ={
        name: '',
        email: '',
        message: '',
        successEmail: '',
        errorEmail: '',
        disableButton: false,
        spinner: false
    }

    // handleSubmit = this.handleSubmit.bind(this);

    handlechange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { name, email, message } = this.state
        const { pluginOptions } = this.props

        if( !pluginOptions.contactUsEmail ) return alert('problem with website email configuration');
        this.setState({ spinner: true })
        try {
            let form = await axios.post('api/form', {
                name,
                email,
                message,
                emailTo : pluginOptions.contactUsEmail
                
            })
            if (form.status === 200){
                this.setState({ successEmail: 'Your message was sent successfully', disableButton: true, spinner:false })
            }else{
                this.setState({ errorEmail: 'There was an issue sending your email try again later', disableButton: false, spinner:false })
            }
            
        }
        catch (error) {
            console.log(error)
            this.setState({ errorEmail: 'There was an issue sending your email', disableButton: false, spinner:false })
        }
        
    }


   render(){
       const { successEmail, errorEmail, spinner, disableButton } = this.state

      return (
            <ContactForm>
                <h1>Contact Us</h1>
                <h4></h4>
                <form onSubmit={ this.handleSubmit.bind(this)}>
                    <Input inputtype='input' label='Name' name='name' onChange={this.handlechange}/>
                    <Input inputtype='input' label='Email' name='email' onChange={this.handlechange}/>
                    <Input inputtype='textarea' label='Message' name='message' onChange={this.handlechange}/>
                    <Flex>
                        <Button type={'submit'} disabled={disableButton}>Send</Button>
                        {spinner &&
                            <Spinner/>
                        }
                    </Flex>
                </form>
                {successEmail && 
                    <Toast message={successEmail}/>
                }
                {errorEmail &&
                    <Toast message={errorEmail} error={true}/>
                }
            </ContactForm>
      )
   }
}


const ContactForm = styled.div`
    padding: 20px 10%;
`;

export default ContactUs;
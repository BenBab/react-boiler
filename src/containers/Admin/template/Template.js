import React, { Component } from 'react';
import { siteName } from '../../../App_config'

import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Buttons/Button';
import Flex from '../../../components/UI/Wrappers/Flex';
import Grid from '../../../components/UI/Wrappers/Grid';
import Spinner from '../../../components/UI/Spinner';

import styled from 'styled-components';

class Template extends Component {

    handleChange = (event) =>{
        event.preventDefault();
        this.props.changeTemplateState(event.target, 'template', null, )
    }

    handlesubmit = (event) => {
        event.preventDefault();
        const url = `/${siteName}/site/template`
        this.props.templateChangeSubmit(url, this.props.template )
    }

    handleCheckbox = check => event => {
        console.log(check , event.target.checked)
        const newevent =  {
            name: event.target.name,
            value: event.target.checked
        }
        this.props.changeTemplateState(newevent, 'template', null, )
    };

    handleMediaModal = (event) => {
        event.preventDefault();
        this.props.openMediaModal(event.target, 'template', null)
    }

    clearInput = (inputName) => {
        const event = { name: inputName, value: '' }
        this.props.changeTemplateState(event, 'template', null, )
    }

    render() {
        if (!this.props.template)return <div></div>;
        //console.log('templateProps', this.props)
        const buttonStyle= [ {value: 'contained'}, {value: 'outlined'} ];
        const { navButtons, siteButtons, transparentHeader, navLightTheme, siteLogo, version } = this.props.template

        return (
            <StyledTemplate>
                <Flex>
                    <Input inputtype="checkbox" sideLabel="Is the header toolbar transparent" name='transparentHeader' checked={transparentHeader} handleChange={this.handleCheckbox}/>
                    <Input inputtype="checkbox" sideLabel="Use Light theme for navigation Bar" name='navLightTheme' checked={navLightTheme} handleChange={this.handleCheckbox}/>
                </Flex>
                <Input inputtype="inputSelector" label='Website Logo' name="siteLogo" value={siteLogo} onChange={this.handleChange} onClick={this.handleMediaModal} clearInput={this.clearInput}/>
                <br/>
                <Grid cols='25% 25%' colsLarge={'35% 35%'} colsMed={'50% 50%'}>
                    <Input inputtype="select" label='Header Navigation button style' name='navButtons' value={navButtons} items={buttonStyle} onSelectChange={this.handleChange}/>
                    <Input inputtype="select" label='Webpage button style' name='siteButtons' value={siteButtons} items={buttonStyle} onSelectChange={this.handleChange}/>
                    <Button variant={navButtons}>{navButtons === 'contained' ? 'Contained Style' : 'Outlined Style'}</Button>
                    <Button variant={siteButtons}>{siteButtons === 'contained' ? 'Contained Style' : 'Outlined Style'}</Button>
                </Grid>
                <br/><hr/><br/>
                <Flex justifyContent='flex-start'>
                <Button margin="2px 5px 15px 20px" onClick={this.handlesubmit}>Update</Button>
                {this.props.isUpdating &&
                    <Spinner/>
                }
                {this.props.stateBackup &&
                    <Button margin="2px 20px 15px 20px" onClick={this.props.cancelUpdate} >Undo Changes</Button>
                }
            </Flex>
            </StyledTemplate>
        );
    }
}

const StyledTemplate = styled.div`
    width:100%;
`;

export default Template;
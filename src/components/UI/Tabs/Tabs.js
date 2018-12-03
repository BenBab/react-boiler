
import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styled from 'styled-components';

import TabItems from './TabItems.js/TabItems'


export default class TabMenu extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;
        const { navigationItems, parent} = this.props;
        console.log('tabs props', this.props)
        let tabLabels = <Tab label="No Header Navigation menu exists yet" /> 
        let tabitems = null


        if( navigationItems.length > 0 ){
            tabLabels = navigationItems.map( (item, index) => {
                //passes the item title down to tabItems, which then runs tabs again if there is a drop down, and passes a parent value back
                return <Tab key={index} label={ parent ? parent+' - '+item.title : item.title} />            
            })
            tabitems = navigationItems.map( (item, index) => {
                return( value === index && <TabItems key={index} itemProps={item}>{item.title }</TabItems> )
            })
        }

        if (tabitems === null && tabLabels === null) return <div></div>
        return (
            <StyledTabs>
                <AppBar position="static">
                <Tabs value={value} onChange={this.handleChange} scrollable scrollButtons="auto">
                    {tabLabels}
                </Tabs>
                </AppBar>
                {tabitems}
            </StyledTabs>
    )
  }
}

const StyledTabs = styled.div`
    > header {
        background-color: ${props => props.theme.primaryBackGroundColour}
    }
`;


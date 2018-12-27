
import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';

import Toast from '../../../components/UI/Toast'

import TabItems from './TabItems.js/TabItems'


export default class TabMenu extends Component {
    state = {
        value: 0,
        disableTabText: ''
    };

    componentDidUpdate(prevProps){
        if(this.props.stateBackup !== prevProps.stateBackup){
            if(this.props.stateBackup){
                this.setState({ disableTabText: 'You have made updates to this page, please save or undo your changes before selecting a new page' });
            }else{
                this.setState({ disableTabText: '' });
            }
        }
    }

    handleChange = (event, value) => {
        if(!this.props.stateBackup){
            this.setState({ value });
        }

    };

    render() {
        const { value } = this.state;
        const { navigationItems, parent, parentId } = this.props;
        console.log('tabMenu props', this.props)
        let tabLabels = null
        let tabitems = null


        if( navigationItems !== null ){
            tabLabels = Object.keys(navigationItems).map((key, index) => {
                const item = navigationItems[key]
                //passes the item title down to tabItems, which then runs tabs again if there is a drop down, and passes a parent value back
                return <Tab key={index} label={ parent ? parent.props.children+' - '+item.title : item.title} />            
            })

            tabitems = Object.keys(navigationItems).map((key, index) => {
                return( value === index &&
                     <TabItems 
                        key={index} 
                        pageId={key} 
                        parentId={parentId || null} 
                        itemProps={navigationItems[key]} 
                        onChange={this.props.onChange}
                        openMediaModal={this.props.openMediaModal}
                        updatePageSubmit={this.props.updatePageSubmit}
                        isUpdating={this.props.isUpdating}
                        cancelUpdate={this.props.cancelUpdate}
                        stateBackup={this.props.stateBackup}
                        availableRoutes={this.props.availableRoutes}
                        >
                        <h2>{ navigationItems[key].title }</h2>
                    </TabItems> )
            });


            // tabLabels = navigationItems.map( (item, index) => {
            //     //passes the item title down to tabItems, which then runs tabs again if there is a drop down, and passes a parent value back
            //     return <Tab key={index} label={ parent ? parent+' - '+item.title : item.title} />            
            // })
            // tabitems = navigationItems.map( (item, index) => {
            //     return( value === index && <TabItems key={index} itemProps={item}>{item.title }</TabItems> )
            // })
        }

        if (tabitems === null && tabLabels === null) return <div></div>
        return (
            <StyledTabs>
                <Tooltip title={this.state.disableTabText}>
                <AppBar position="static">
                <Tabs value={value} onChange={this.handleChange} scrollable scrollButtons="auto">
                    {tabLabels}
                </Tabs>
                </AppBar>
                </Tooltip>
                {tabitems}
                {this.props.isError &&
                    <Toast message={this.props.isError} error={true}/>
                }
            </StyledTabs>
    )
  }
}

const StyledTabs = styled.div`
    > header {
        background-color: ${props => props.theme.primaryBackGroundColour};  

    }
`;


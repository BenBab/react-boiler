import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import NavigationItem from './NavigationItem/NavigationItem';
import { withRouter } from 'react-router-dom';
class NavigationItems extends Component {
    
    handleNavSelection = (event) => {
        const selected = event.target.innerText
        //const selectedIndex = this.state.navigationItems.find( item => { item.title === selected})
        //const stateCopy = { ...this.state.navigationItems }

        const navigationItems = Object.keys(this.props.navigationItems).map(key => {
            const item = this.props.navigationItems[key]
            if (item.title === selected){
                item.selected = !item.selected;
                if (!item.dropdownPages){
                    const route = '/'+ item.route
                    console.log('Navigation Items props', this.props)
                    this.props.history.push(route)
                }
            }else {
                item.selected = false;
            }
            return item
        })
        this.setState({ navigationItems })
    }

    render(){

        let navigationItems = null;
        
        if (this.props.navigationItems !== null){
            navigationItems = Object.keys(this.props.navigationItems).map((key, index) => {
                const navItem = this.props.navigationItems[key]
                return (
                 <div key={index} onClick={this.handleNavSelection}>
                     <NavigationItem selected={navItem.selected} dropdownMenu={navItem.dropdownPages}>{navItem.title}</NavigationItem>
                 </div>   
                )
            })
        }
        
        return(
            <StyledNavItems>
                {navigationItems}
                <NavigationItem link="/">Contact Us</NavigationItem>
            </StyledNavItems>
        )
    }
       
}; 
    


const StyledNavItems = styled.div`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 100%;

    @media (min-width: 500px) {
        flex-flow: row;
}
    
`;

const mapStateToProps = state => {
    return {
        navigationItems: state.dashboard.navigationItems
    };
}


export default connect(mapStateToProps)(withRouter(NavigationItems));
import React, { Component } from 'react';

import styled from 'styled-components';
import NavigationItem from './NavigationItem/NavigationItem';
import { withRouter } from 'react-router-dom';
class NavigationItems extends Component {
    state = {
        navigationItems : [ 
        {
          dropdownPages : [ { route : "wedding-dj", title : "wedding dj" }, { route : "21st-dj", title : "21st Dj" } ],
          route : "services",
          selected : false,
          title : "Services"
        }, { 
          dropdownPages : [ { route : "who-we-are", title : "Who we are" }, {route : "reviews", title : "Reviews" } ],
          route : "about-us",
          selected : false,
          title : "About us"
        }, {
          route : "book-now",
          selected : false,
          title : "Book Now"
        } ]
      }
    
    handleNavSelection = (event) => {
        const selected = event.target.innerText
        //const selectedIndex = this.state.navigationItems.find( item => { item.title === selected})
        //const stateCopy = { ...this.state.navigationItems }
        const navigationItems = this.state.navigationItems.map( item => {
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
        
        if (this.state.navigationItems.length > 0){
            navigationItems = this.state.navigationItems.map( (navItem, index) => {
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

export default withRouter(NavigationItems);
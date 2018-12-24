import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import NavigationItem from './NavigationItem/NavigationItem';
import { withRouter } from 'react-router-dom';

import Button from '../../UI/Buttons/Button'
import DropdownMenu from '../../UI/Menu/DropdownMenu'
class NavigationItems extends Component {

    state = {
        navigationItems: null,
        homeActive: false
    }

    componentDidUpdate(prevProps){
        if(this.props.navigationItems !== prevProps.navigationItems && this.props.navigationItems !== null){
            const currentRoute = this.props.location.pathname.replace('/','')
            const navigationItems = Object.keys(this.props.navigationItems).map(key => {
                const item = this.props.navigationItems[key]
                if(item.route === currentRoute){
                    item.selected = true
                }else{
                    item.selected = false
                }
                return item;
            })

            if(this.props.location.pathname === '/'){
                this.setState({ navigationItems, homeActive: true })
            }else{
                this.setState({ navigationItems })
            }
        }
    }

    handleNavSelection = (event) => {
        let selected = event.target.innerText.trim();
        if (selected.toUpperCase() === 'HOME'){selected = '/'}

        const navigationItems = Object.keys(this.state.navigationItems).map(key => {
            const item = this.state.navigationItems[key]
            if (item.title.toUpperCase() === selected.toUpperCase() ){
                item.selected = true;
                if (!item.dropdownPages){
                    const route = '/'+ item.route
                    this.props.history.push(route)
                }
            }else {
                item.selected = false;
            }
            return item
        })
       
        if(selected === '/'){
            this.props.history.push('/')
            this.setState({ navigationItems, homeActive: true })
        }else{
            this.setState({ navigationItems, homeActive: false })
        }
    }

    render(){

        let navigationItems = null;
        console.log('this is the state of the nav items',this.state)
        console.log('navigation items props', this.props)
        
        if (this.state.navigationItems !== null){
            navigationItems = Object.keys(this.state.navigationItems).map((key, index) => {
                const navItem = this.state.navigationItems[key];
                let navButton = null;
                
                navButton = !navItem.dropdownPages
                    ? <Button key={index} variant='outlined' onClick={this.handleNavSelection} active={navItem.selected}>
                        {navItem.title}
                      </Button>
                    : <DropdownMenu key={'navDropdown_'+index} id={'navDropdown_pos'+index} title={navItem.title} menuItems={navItem.dropdownPages} history={this.props.history} variant='outlined'/>

                return (
                //  <Button key={index} onClick={this.handleNavSelection} >
                //      <NavigationItem selected={navItem.selected} dropdownMenu={navItem.dropdownPages}>{navItem.title}</NavigationItem>
                //  </Button>   
                navButton



                )
            })
        }
        
        return(
            <StyledNavItems>
                <Button variant='outlined' onClick={this.handleNavSelection}>
                    Home
                </Button>
                {navigationItems}

            </StyledNavItems>
        )
    }
       
}; 
    


const StyledNavItems = styled.div`
    /* margin: 0;
    padding: 0;
    list-style: none; */
    display: flex;
    /* flex-flow: column;
    align-items: center;
    height: 100%; */

    @media (min-width: 500px) {
        /* flex-flow: row; */
}
    
`;

const mapStateToProps = state => {
    return {
        navigationItems: state.mainState.navigationItems
    };
}


export default connect(mapStateToProps)(withRouter(NavigationItems));
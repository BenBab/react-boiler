import React from 'react'
import styled, { withTheme } from 'styled-components'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/Drawertoggle';

 const toolbar = ( props ) => {
    
    let background = null
    let shadow = '1px 2px 10px #333333'


    if (props.template){
        background = props.template.transparentHeader ? 'transparent' : props.theme.toolbarBackground;

        if (props.template.transparentHeader && props.isTop){
            shadow = 'none';
        }
    }


    return (
        
        <Header background={background} isTop={props.isTop} shadow={shadow}>
            <Logo {...props.template}/>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <div className="DesktopOnly">
                <NavigationItems />  
            </div>
                
        </Header>
    );
}

const Header = styled.header`
    background-color: ${props => props.isTop ? props.background : props.theme.toolbarBackground};
    height: ${props => props.isTop ? '75px' : '56px'};
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 90;
    transition: height 0.5s, background-color 0.5s; 
    box-shadow: ${props => props.shadow};

    > nav {
        height: 100%;
    }

    > div:nth-child(1) {
        height: 80%;
    }   

    @media (max-width: 499px) {
        .DesktopOnly {
            display: none;
    }
}`;


export default withTheme(toolbar);
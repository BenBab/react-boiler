import React from 'react'
import styled from 'styled-components';

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/Drawertoggle';

 const toolbar = ( props ) => (
     
      <Header {...props.template}>
        <Logo/>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className="DesktopOnly">
            <NavigationItems/>  
        </div>
             
      </Header>
);

const Header = styled.header`
    background-color: ${props => props.transparentHeader ? 'transparent' : props.theme.primaryBackGroundColour};
    height: 56px;
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




export default toolbar;
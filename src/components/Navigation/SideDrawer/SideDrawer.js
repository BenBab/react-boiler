import React from 'react';
import styled from 'styled-components';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/BackDrop';

const sideDrawer = ( props ) => {
    return (
        <>
            <Backdrop show={props.open} clicked={props.closed}/>
            <StyledSideDrawer isOpen={props.open}>
                <div className="mobile-logo">
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </StyledSideDrawer>
        </>
    );
};

const StyledSideDrawer = styled.div`
    position: fixed;
    width: 280px;
    max-width: 70%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 200;
    background-color: white;
    padding: 32px 16px;
    box-sizing: border-box;
    transition: transform 0.3s ease-out;
    transform: ${props => props.isOpen ? "translateX(0)" : " translateX(-100%)" };

    @media (min-width: 500px) {
            display: none;
    }

    .mobile-logo {
        height: 11%;
        margin-bottom: 32px;
    }
`;

export default sideDrawer;
import React from 'react';
import styled from 'styled-components';

const drawerToggle = (props) => (
    <HamburgerMenu onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </HamburgerMenu>
);

const HamburgerMenu = styled.div`
    width: 40px;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    box-sizing: border-box;
    cursor: pointer;

    > div {
        width: 90%;
        height: 3px;
        background-color: ${props => props.theme.toolbarHamburger};
    }

    @media (min-width: 500px) {
        display: none;
    }
`;

export default drawerToggle;
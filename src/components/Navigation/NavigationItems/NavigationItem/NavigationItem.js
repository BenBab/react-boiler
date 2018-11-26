import React from 'react';
import styled from 'styled-components';

const navigationItem = ( props ) => (
    <NavItem>
        <a 
            href={props.link} 
            >{props.children}</a>
    </NavItem>
);

const NavItem = styled.li`
   
    margin: 10px 0;
    box-sizing: border-box;
    display: block;
    width: 100%;
    
    > a {
        color: ${props => props.theme.primaryBackGroundColour};
        text-decoration: none;
        width: 100%;
        box-sizing: border-box;
        display: block;
    }

    a:hover,
    a:active,
    a.active {
        color: #40A4C8;
    }

    @media (min-width: 500px) {
        margin: 0;
        display: flex;
        height: 100%;
        width: auto;
        align-items: center;
        
        > a {
            color: ${props => props.theme.primaryTxtColour};
            height: 100%;
            padding: 16px 10px;
            border-bottom: 4px solid transparent;
        }
        
        a:hover,
        a:active,
        a.active {
            background-color: ${props => props.theme.primaryBackGroundColour};
            border-bottom: 4px solid #40A4C8;
            color: ${props => props.theme.primaryTxtColour};
        }
    }
`;

export default navigationItem;
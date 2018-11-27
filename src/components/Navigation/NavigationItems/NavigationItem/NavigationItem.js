import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const navigationItem = ( props ) => {
    let menuItem = null
    if (props.dropdownMenu){
        menuItem = props.dropdownMenu.map((menuItem, i) => {
            return (
                <li key={i}>
                    <NavLink to={'/pages/' + menuItem.route}>{menuItem.title}</NavLink>
                </li>
            )
        })
    }

    return(
        <NavItem>
            <button >
                {props.children}
            </button>
            {props.selected &&
            <div>
                {menuItem}
            </div>
            }
        </NavItem>
    )
}

const NavItem = styled.ul`
   
    margin: 10px 0;
    box-sizing: border-box;
    display: block;
    width: 100%;
    
    > button {
        background:none;
        color: ${props => props.theme.primaryBackGroundColour};
        text-decoration: none;
        width: 100%;
        box-sizing: border-box;
        display: block;
        border-color: transparent;
        cursor: pointer;
        
    }

    button:hover,
    button:active,
    button.active {
        color: #40A4C8;
    }

    /* Desktop */
    @media (min-width: 500px) {
        margin: 0;
        display: flex;
        height: 100%;
        width: auto;
        align-items: center;
        
        > button {
            background-color: ${props => props.theme.primaryBackGroundColour};
            color: ${props => props.theme.primaryTxtColour};
            height: 100%;
            padding: 16px 10px;
            border-color: aliceblue;
            border-bottom: 4px solid transparent;
            border-radius: 10px;
            cursor: pointer;
        }

        > div {
            position: fixed;
            top: 60px;
        }
        
        button:hover,
        button:active,
        button.active {
            background-color: ${props => props.theme.primaryBackGroundColour};
            border-bottom: 4px solid #40A4C8;
            color: ${props => props.theme.primaryTxtColour};
        }
    }
`;

export default navigationItem;
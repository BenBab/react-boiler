import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


const navigationItem = ( props ) => {
    console.log('navItem props', props)

    let menuItem = null
    if (props.dropdownMenu){
        menuItem = Object.keys(props.dropdownMenu).map((key, i) => {
            const menuItem = props.dropdownMenu[key]
            return (
                <DropMenu key={i}>
                    <NavLink to={'/pages/' + menuItem.route}>{menuItem.title}</NavLink>
                </DropMenu>
            )
        })
    }

    return(
        <div>
            {props.children}
            
            {props.selected &&
            <div>
                {menuItem}
            </div>
            }
        </div>
    )
}

const DropMenu = styled.div`
    display: block;
`;

const NavItem = styled.div`
   
    /* margin: 10px 0;
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
    } */

    /* Desktop */
    @media (min-width: 500px) {
        /* margin: 0;
        display: flex;
        height: 100%;
        width: auto;
        align-items: center; */
        
        /* > button {
            background-color: ${props => props.theme.primaryBackGroundColour};
            color: ${props => props.theme.primaryTxtColour};
            height: 100%;
            padding: 16px 10px;
            border-color: aliceblue;
            border-bottom: 4px solid transparent;
            border-radius: 10px;
            cursor: pointer;
        } */

        /* > div {
            position: fixed;
            top: 60px;
        }
        
        button:hover,
        button:active,
        button.active {
            background-color: ${props => props.theme.primaryBackGroundColour};
            border-bottom: 4px solid #40A4C8;
            color: ${props => props.theme.primaryTxtColour};
        } */
    }
`;

export default navigationItem;
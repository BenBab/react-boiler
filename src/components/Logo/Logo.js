import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const logo = (props) => (
    <StyledLogo>
        <NavLink to={'/'}>
            <img src={burgerLogo} alt="Logo" />
        </NavLink>    
    </StyledLogo>
);

const StyledLogo = styled.div`
    background-color: ${props => props.theme.primaryTxtColour};
    padding: 8px;
    height: 100%;
    box-sizing: border-box;
    border-radius: 5px;

    > a img {
        height: 100%;
    }
`;

export default logo;
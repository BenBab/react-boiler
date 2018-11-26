import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import styled from 'styled-components';

const logo = (props) => (
    <StyledLogo>
        <img src={burgerLogo} alt="Logo" />
    </StyledLogo>
);

const StyledLogo = styled.div`
    background-color: ${props => props.theme.primaryTxtColour};
    padding: 8px;
    height: 100%;
    box-sizing: border-box;
    border-radius: 5px;

    > img {
        height: 100%;
    }
`;

export default logo;
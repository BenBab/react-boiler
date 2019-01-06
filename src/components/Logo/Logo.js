import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const logo = (props) => {
  if (!props.siteLogo){
    return <div/>
  }

  return (
    <StyledLogo width={props.width}>
        <NavLink to={'/'}>
            <img src={props.siteLogo} onLoad={props.onLoad} alt="Logo" />
        </NavLink>    
    </StyledLogo>
  );
}
const StyledLogo = styled.div`
    background-color: ${props => props.theme.logoBackground};
    padding: 8px;
    height: 100%;
    max-height:135px;
    box-sizing: border-box;
    border-radius: 5px;

    > a img {
        height: 100%;
        width: ${props => props.width || 'auto'};
        min-width: ${props => props.width ? '200px' : 'auto' };
        max-width: ${props => props.width ? '230px' : 'auto' };
    }
`;

export default logo;
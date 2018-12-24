import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const button = (props) => {
    const { disabled = false } = props
   
    return (
        <StyledButton margin={props.margin} variant={props.variant || "contained"} >
            <label htmlFor="contained-button-file">
            <Button 
            variant={props.variant || "contained"} 
            onClick={props.onClick} 
            disabled={disabled}>
                {props.children}
            </Button>
            </label>
        </StyledButton>
    );
};

const StyledButton = styled.div`
    margin: ${props => props.margin || '5px'};
    
    > label button {
        background-color: ${props => props.variant === 'contained' ? props.theme.primaryBackGroundColour : 'transparent'};
        color: ${props => props.variant = 'contained' ? props.theme.primaryTxtColour : props.theme.primaryBackGroundColour};  
        
        &:hover{
            background-color: ${props => props.theme.buttonHoverBackground};
            color: ${props => props.theme.buttonhovertext};  
        }
    }
    
`;

export default button;
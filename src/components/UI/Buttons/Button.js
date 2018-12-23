import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const button = (props) => {
    const { disabled = false } = props
   
    return (
        <StyledButton margin={props.margin}>
            <label htmlFor="contained-button-file">
            <Button 
            variant={props.varient || "contained"} 
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
    
    >label button {
        background-color: ${props => props.theme.primaryBackGroundColour};
        color: ${props => props.theme.primaryTxtColour};  

        &:hover{
            background-color: ${props => props.theme.buttonHoverBackground};
            color: ${props => props.theme.buttonhovertext};  
        }
    }
    
`;

export default button;
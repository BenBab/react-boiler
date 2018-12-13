import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const uploadButton = (props) => {
    const { disabled = false } = props
   
    return (
        <StyledButton margin={props.margin}>
            <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
            <Button 
            variant={props.varient || "contained"} 
            component='span'
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

    > input {
       /* display: none;  */
    }
`;

export default uploadButton;
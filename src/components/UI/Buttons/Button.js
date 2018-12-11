import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const button = (props) => {
    const { disabled = false,  } = props
    
    return (
        <StyledButton margin={props.margin}>
            <Button variant="contained" onClick={props.onClick} disabled={disabled}>
                {props.children}
            </Button>
        </StyledButton>
    );
};

const StyledButton = styled.div`
    margin: ${props => props.margin || '5px'};
`;

export default button;
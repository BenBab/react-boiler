import React from 'react';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';


const spinner = ( props ) => (
    <StyledSpinner >
        <CircularProgress  />
    </StyledSpinner>
);

const StyledSpinner = styled.div`
    > div {
        height: 20px !important;
        width: 20px !important;
        margin: "theme.spacing.unit * 2";
        color: ${props => props.theme.primaryBackGroundColour};

    }
`;

export default spinner;
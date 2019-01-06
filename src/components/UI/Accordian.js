import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styled from 'styled-components';

const accordian = ( props ) => (
    <StyledAccordian >
        <ExpansionPanel onChange={() => props.onClick(props.name)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div>{props.title}</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            {props.children
                ? props.children
                : <div></div>
            }
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </StyledAccordian>
);

const StyledAccordian = styled.div`
    margin: 15px 5px;
  
    /* > div {
        height: 20px !important;
        width: 20px !important;
        margin: "theme.spacing.unit * 2";
        color: ${props => props.theme.primaryBackGroundColour};

    } */
`;

export default accordian;

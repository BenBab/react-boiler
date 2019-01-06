import React from 'react'
import styled from 'styled-components';

const Grid = (props) => {
  const cols = props.cols || '50% 50%'

  return (
    <StyledGrid
      cols={cols}
      colsMed={props.colsMed}
      colsLarge={props.colsLarge}

      margin={props.margin}
      marginMed={props.marginMed}
      marginLarge={props.marginLarge}
      
      colGap={props.colGap}
      rowGap={props.rowGap}
      height={props.height}
      >
        {props.children}
    </StyledGrid>
  )
}

const StyledGrid = styled.div` 
    display: grid;
    margin: ${props => props.margin || '20px'};
    grid-template-columns: ${props => props.cols};
    grid-column-gap: ${props => props.colGap || '20px'};
    align-items: center;
    height: ${props => props.height ? props.height : 'auto'};
    grid-row-gap: ${props => props.rowGap ? props.rowGap : 'initial'};

    @media (max-width: 1024px) {
      grid-template-columns: ${props => props.colsLarge || props.cols };
    }
    
    @media (max-width: 768px) {
      grid-template-columns: ${props => props.colsMed || props.cols };
      margin: ${props => props.marginMed || props.margin };
    }
    
`;

export default Grid;
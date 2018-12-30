import React from 'react'
import styled from 'styled-components';

const Grid = (props) => {
  return (
    <StyledGrid
      margin={props.margin}
      cols={props.cols}
      colGap={props.colGap}
      >
        {props.children}
    </StyledGrid>
  )
}

const StyledGrid = styled.div` 
    display: grid;
    margin: ${props => props.margin || '20px'};
    grid-template-columns: ${props => props.cols || '50% 50%'};
    grid-column-gap: ${props => props.colGap || '20px'};
    align-items: center;
    
`

export default Grid;
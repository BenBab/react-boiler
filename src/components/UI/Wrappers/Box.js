import React from 'react'
import styled from 'styled-components';

const Box = (props) => {
  const boxOpacity = props.opacity || false;
  
  return (
    <StyledBox 
      margin={props.margin}
      opacity={boxOpacity ? '0.5' : '1'}
      >
        {props.children}
    </StyledBox>
  )
}

const StyledBox = styled.div`
    margin: ${props => props.margin || '20px'};
    opacity: ${props => props.opacity};
`

export default Box;
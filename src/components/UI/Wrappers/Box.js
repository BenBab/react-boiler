import React from 'react'
import styled from 'styled-components';

const Box = (props) => {
  return (
    <StyledBox 
      margin={props.margin}
      opacity={props.opacity || false}
      >
        {props.children}
    </StyledBox>
  )
}

const StyledBox = styled.div`
    margin: ${props => props.margin || '20px'};
    opacity: ${props => props.opacity ? '0.5' : '1'};
`

export default Box;
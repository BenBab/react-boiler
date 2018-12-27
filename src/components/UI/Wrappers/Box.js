import React from 'react'
import styled from 'styled-components';

const Box = (props) => {
  return (
    <StyledBox 
      margin={props.margin}
      >
        {props.children}
    </StyledBox>
  )
}

const StyledBox = styled.div`
    margin: ${props => props.margin || '20px'};
`

export default Box;
import React from 'react'
import styled from 'styled-components';

const Flex = (props) => {
  return (
    <FlexBox 
      justifyContent={props.justifyContent}
      margin={props.margin}
      >
        {props.children}
    </FlexBox>
  )
}

const FlexBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.justifyContent || 'initial'};
    margin: ${props => props.margin || 'auto'};
`

export default Flex;

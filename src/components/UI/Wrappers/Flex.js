import React from 'react'
import styled from 'styled-components';

const Flex = (props) => {
  return (
    <FlexBox 
      justifyContent={props.justifyContent}
      margin={props.margin}
      align={props.align || 'center'}
      >
        {props.children}
    </FlexBox>
  )
}

const FlexBox = styled.div`
    display: flex;
    align-items: ${props => props.align};
    justify-content: ${props => props.justifyContent || 'initial'};
    margin: ${props => props.margin || 'auto'};
`

export default Flex;

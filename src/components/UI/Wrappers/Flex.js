import React from 'react'
import styled from 'styled-components';

const Flex = (props) => {
  return (
    <FlexBox>
        {props.children}
    </FlexBox>
  )
}

const FlexBox = styled.div`
    display: flex;
    align-items: center;
`

export default Flex;

import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import Flex from '../UI/Wrappers/Flex'
import styled from 'styled-components';

 const Input = (props) => {
  let inputElement = null;
  let selectItems = null
console.log('inputProps', props)

  
  switch ( props.inputtype ){
    case ( 'input' ):
        inputElement = <input />
    break;
    case ( 'textarea' ):
        inputElement = <textarea />
    break;
    case ( 'select' ):
        selectItems = props.items.map( (item) => {
            return <option key={item.route} value={item.title}>{item.title}</option>       
        })
        inputElement =
            <select value={props.value || props.items[0]} onChange={props.onSelectChange} >
                {selectItems}
            </select>
    break;
    case ( 'checkbox' ):
        inputElement = 
        <Flex>
            <Checkbox
                checked={props.checked}
                onChange={props.handleChange('checked')}
                color="primary"
                value="checked"
            />
            <label>{props.sideLabel}</label>
        </Flex>
    break;
    default:
        inputElement = <input/>
  }

  return (
    <StyledElement>
        <label>{props.label}</label>
        {inputElement}
    </StyledElement>
  )
}

const StyledElement = styled.div`

    > label {
        font-weight: bold;
        display: block;
        margin-bottom: 8px;
    }

    > textarea{
        height: 230px;
    }

    > input,
    textarea,
    select {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        outline: none;
        border: 1px solid #ccc;
        background-color: white;
        font: inherit;
        padding: 6px 10px;
        display: block;
        width: 100%;
        box-sizing: border-box;

        :focus {
        outline: none;
        background-color: #ccc;
    }

}`;



export default Input;
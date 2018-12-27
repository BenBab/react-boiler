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
        inputElement = 
        <input 
            name={props.name} 
            value={props.value} 
            onChange={props.onChange} 
            disabled={props.disabled || false} 
            placeholder={props.placeholder}/>
    break;
    case ( 'inputSelector' ):
        inputElement = 
            <input
                name={props.name} 
                value={props.value} 
                onClick={props.onClick} 
                readOnly/>
    break;
    case ( 'textarea' ):
        inputElement = <textarea name={props.name} value={props.value} onChange={props.onChange}/>
    break;
    case ( 'select' ):
        if (typeof props.items === 'object'){
            selectItems = Object.keys(props.items).map((key, i) => { 
                const item = props.items[key]
                return <option key={i} value={item.title || item.value}>{item.title || item.value}</option>       
            })
        }else {
            selectItems = props.items.map((item, i) => { 
                return <option key={i} value={item.title || item.value}>{item.title || item.value}</option>              
            })
        }

        inputElement =
            <select value={props.value || props.items[0]} onChange={props.onSelectChange} name={props.name}>
                {selectItems}
            </select>
    break;
    case ( 'checkbox' ):
        inputElement = 
        <Flex>
            <Checkbox
                name={props.name}
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
    margin: 0 10px 15px 0;

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
        box-sizing: border-box;
        outline: none;
        border: 1px solid #ccc;
        background-color: white;
        font: inherit;
        padding: 6px 10px;
        display: block;
        box-sizing: border-box;


        :focus {
        outline: none;
        background-color: #ccc;
    }

}`;



export default Input;
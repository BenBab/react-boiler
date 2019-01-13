import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import Flex from '../UI/Wrappers/Flex'
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import ColourPicker from './ColourPicker';


 const Input = (props) => {
  let inputElement = null;
  let selectItems = null
//console.log('inputProps', props)

  
  switch ( props.inputtype ){
    case ( 'input' ):
        inputElement = 
        <input 
            name={props.name} 
            value={props.value} 
            onChange={props.onChange} 
            disabled={props.disabled || false} 
            placeholder={props.placeholder}
            type={props.type || 'text'}
            />
    break;
    case ( 'inputSelector' ):
        inputElement = 
            <>
            <input
                name={props.name} 
                value={props.value} 
                onClick={props.onClick}
                onChange={props.onChange} 
                readOnly/>
            {props.value &&
            <IconButton aria-label="Add" onClick={() => props.clearInput(props.name)}>
                <CancelIcon fontSize="small"/>
            </IconButton> 
            }
            </>
    break;
    case ( 'inputColourPicker' ):
        inputElement = 
            <ColourPicker
                name={props.name} 
                value={props.value} 
                changeColour={props.changeColour} 
                pageId={props.pageId}
                parentId={props.parentId}
            />  
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
                onChange={props.handleChange('checked', props.parentObj)}
                color="primary"
                value="checked"
                parent={props.parent}
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
        <Flex>
            {inputElement}
        </Flex>
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

    >div textarea{
        height: 230px;
    }

    > div input,
    div textarea,
    div select {
        width: 100%;
        box-sizing: border-box;
        outline: none;
        border: 1px solid #ccc;
        background-color: white;
        font: inherit;
        padding: 6px 10px;
        display: block;
        box-sizing: border-box;
        border-radius: 5px;

        :focus {
        outline: none;
        border-color: #9ecaed;
        box-shadow: 0 0 10px #9ecaed;

        }
    }

    > div button {
        opacity: 0.7;        
    }
    


`;



export default Input;
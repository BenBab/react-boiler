import React from 'react'

 const Input = (props) => {
  let inputElement = null;
  
  switch ( props.inputtype ){
    case ( 'input' ):
        inputElement = <input/>
    break;
    case ( 'input' ):
        inputElement = <textarea/>
    break;
    case ( 'input' ):
        inputElement = <select/>
    break;
    default:
        inputElement = <input/>
  }

  return (
    <div>
        <label>{props.label}</label>
        {inputElement}
    </div>
  )
}

export default Input;
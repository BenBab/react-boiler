import React from 'react';
import Button from '@material-ui/core/Button';


const button = (props) => {
    const { disabled = false,  } = props
    
    return (
        <div>
            <Button variant="contained" onClick={props.onClick} disabled={disabled}>
                {props.children}
            </Button>
        </div>
    );
};

export default button;
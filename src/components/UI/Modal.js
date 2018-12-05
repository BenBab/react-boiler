import React from 'react'

//import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Modal = (props) => {
  // const childrenWithProps = React.Children.map()
  
  return (
    <div>
      <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {props.description}
            </DialogContentText>
            <br/><br/>
            {/* {React.cloneElement(props.children, { handleSubmit: props.handleSubmit })} */}
            {props.children}
          </DialogContent>
          {/* <DialogActions>
            <button onClick={props.handleClose} >
              Cancel
            </button>
            <button onClick={props.handleSubmit} >
              Confirm
            </button>
          </DialogActions> */}
        </Dialog>
    </div>
  )
}

export default Modal


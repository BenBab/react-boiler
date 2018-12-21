import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import styled from 'styled-components';

class Toast extends Component {
  state = {
    open: false,
  };

  componentDidMount(){
    this.setState({ open: true });

  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };
  
  render() {
    return (
      <StyledSnackBar error={this.props.error}>
          <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>, 
          ]}
        />
      </StyledSnackBar>
    )
  }
}

const StyledSnackBar = styled.div`
    >div div{
      background-color: ${props => props.error ? 'rgb(220, 52, 54)' : 'rgb(49, 49, 49)' };
      font-weight: ${props => props.error ? 'bold' : 'initial' };
    }
`;


export default Toast

import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '../Buttons/Button'

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
// import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import styled from 'styled-components';

class SimpleMenu extends React.Component {
  state = {
    open: false,
    anchorEl: null
  };

  handleToggle = (event) => {
    const { currentTarget } = event;
    this.setState(state => ({ open: !state.open, anchorEl: state.anchorEl ? null : currentTarget }));
  };

  handleClose = (event, route) => {
    if (event.target && event.target.nodeName !== 'DIV') {
      if (route !== null && typeof route === 'string'){
        this.setState({ open: false, anchorEl: null });
        this.redirect(route)
      }
      return;
    }
    this.setState({ open: false, anchorEl: null });
   
  };

  redirect = (route) => {
    this.props.history.push('/pages/' + route)
  };

  render() {
    const { open, anchorEl } = this.state;
    let menuItems = null
    console.log(this.props)

    if( this.props.menuItems !== null){
        menuItems =  Object.keys(this.props.menuItems).map((key, i) => {
            const menuItem = this.props.menuItems[key]
            return <MenuItem key={i} onClick={(e) => this.handleClose(e, menuItem.route)}>{menuItem.title}</MenuItem> 
        })
    }

    let placement = this.props.placement || 'bottom'

    return (
      <div>
        <Button
          id={this.props.id}
          nav={true}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          variant={this.props.variant}
          onClick={this.handleToggle}
          margin={this.props.margin}
        >
          {this.props.title}
        </Button>
        <Popper open={open} anchorEl={anchorEl} transition disablePortal placement={placement}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'top' ? 'center top' : 'center bottom' }}
              >
                <StyledMenu>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      {menuItems}
                    </MenuList>
                  </ClickAwayListener>
                </StyledMenu>
              </Grow>
            )}
          </Popper>
      </div>
    );
  }
}

const StyledMenu = styled.div`
  background-color: ${props => props.theme.primaryBackGroundColour };
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;


  ul li {
    color: ${props => props.theme.primaryTxtColour };  
  }
`

export default SimpleMenu;
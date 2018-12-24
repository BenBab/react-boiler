import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '../Buttons/Button'

import styled from 'styled-components';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
    buttonHeight: 0
  };

  // componentDidMount(prevProps){
  //   if (this.props.id !== null){
  //     const height = document.getElementById(this.props.id)
  //     this.setState({ height });
  //   }
  // }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (route) => {
    this.setState({ anchorEl: null });
    if (route !== null && typeof route === 'string'){
        this.redirect(route)
    }
  };

  redirect = (route) => {
    this.props.history.push('/pages/' + route)
  };

  render() {
    const { anchorEl } = this.state;
    let menuItems = null
    console.log(this.props)

    if( this.props.menuItems !== null){
        menuItems =  Object.keys(this.props.menuItems).map((key, i) => {
            const menuItem = this.props.menuItems[key]
            return <MenuItem key={i} onClick={() => this.handleClose(menuItem.route)}>{menuItem.title}</MenuItem> 
        })
    }

    return (
      <div>
        <Button
          id={this.props.id}
          variant={this.props.variant}
          onClick={this.handleClick}
        >
          {this.props.title}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {menuItems}
        </Menu>
      </div>
    );
  }
}

const StyledMenu = styled.div`

`;


export default SimpleMenu;
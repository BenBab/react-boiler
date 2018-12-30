import React, { Component } from 'react'

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        isTop: true
    }

    componentDidMount() {
        document.addEventListener("scroll", () => {
          const isTop = window.scrollY < 10;
          if (isTop !== this.state.isTop) {
            this.setState({ isTop });
          }
        });
      }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render() {
        return (
            <>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} template={this.props.template} isTop={this.state.isTop}/>
            <SideDrawer 
                open={this.state.showSideDrawer}
                closed={this.sideDrawerClosedHandler}
                template={this.props.template}
            />
            <main>
                {this.props.children}
            </main>
            </>
        )
    }
}

export default Layout;
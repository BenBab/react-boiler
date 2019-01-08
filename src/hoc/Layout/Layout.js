import React, { Component } from 'react'
import styled from 'styled-components';

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
            <SiteWrapper>
                <SiteContent>
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} template={this.props.template} isTop={this.state.isTop}/>
                    <SideDrawer 
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}
                        template={this.props.template}
                    />
                    <main>
                        {this.props.children}
                    </main>
                </SiteContent>
            </SiteWrapper>
        )
    }
}

const SiteWrapper = styled.div`
    /* display: grid;
    grid-template-columns: 1fr 100% 1fr; */
    background-color: ${props => props.theme.websiteWrapperColour};
    
`;

const SiteContent = styled.div`
    max-width: 1500px;
    margin: 0 auto 0 auto;
    padding-bottom: 70px;
    

    /* div:nth-child(0){
        padding-left: 100px;
        padding-right: 100px;
    } */
`;

export default Layout;
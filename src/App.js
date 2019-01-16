import React, { Component } from 'react';
import { Route, withRouter }  from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import Admin from './containers/Admin/Admin';
import Auth from './containers/Auth/Auth';

import { ThemeProvider } from 'styled-components';
import { mainTheme } from './styles/theme';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount(){
    // axios.get('gs://react-boiler-5ecbd.appspot.com/djhire.json')
    // .then(response => {
    //   console.log('initial response', response)
    // })
    this.props.onInitWebsiteState();

  }

  isClientOrServer = () => {
    return (typeof window !== 'undefined' && window.document) ? 'client' : 'server';
  };

  render() {

    console.log(this.isClientOrServer())
    
    //console.log('app file state', this.state)
    console.log('app file props', this.props)
    let dynamicRoutes = []
    let homePage = null
    let theme = mainTheme

    if (this.props.home !== null){
      homePage = this.props.home
      if (this.props.navigationItems !== null ){
        const { navigationItems } = this.props
        let routesState=[{value: '/'}]
        
        dynamicRoutes = Object.keys(navigationItems).map((key, i) => {
          const item = this.props.navigationItems[key]
          if (!item.dropdownPages){
            routesState=[...routesState, {value: '/' + item.route}]
            return <Route key={i} path={'/' + item.route } render={(props) => (<Dashboard pageInfo={item} {...props} template={this.props.template} plugins={this.props.plugins}/>)}/>
          }
          else {
            return Object.keys(item.dropdownPages).map((key, i) => {
              const dropDownItem = item.dropdownPages[key]
              routesState=[...routesState, {value: '/pages/' + dropDownItem.route}]
              return <Route key={i} path={'/pages/' + dropDownItem.route } render={(props) => (<Dashboard pageInfo={dropDownItem} {...props} template={this.props.template} plugins={this.props.plugins}/>)} />
            })
          }
        })
        this.props.onStoreRoutes(routesState)
      }
    }

    if (this.props.template){
      theme = Object.assign({}, mainTheme, {'navLightTheme': this.props.template.navLightTheme } )
    }

    return (
      <ThemeProvider theme={theme}>
        <Layout template={this.props.template}>
          <Route path='/' exact render={(props) => (<Dashboard pageInfo={homePage} {...props} template={this.props.template} plugins={this.props.plugins} />)} />
          <Route path='/admin' component={Admin} />
          <Route path='/authenticate-admin' component={Auth} />
          {dynamicRoutes}
        </Layout>
      </ThemeProvider>
    );
  }
}


const mapStateToProps = state => {
  return {
      home: state.mainState.home,
      navigationItems: state.mainState.navigationItems,
      template: state.mainState.template,
      plugins: state.mainState.plugins,
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onInitWebsiteState: () => dispatch(actions.initWebsiteState()),
      onStoreRoutes: (routesState) => dispatch(actions.storeRoutes(routesState)),
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React, { Component } from 'react';
import { Route, withRouter }  from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import Admin from './containers/Admin/Admin';
import Auth from './containers/Auth/Auth';
import ContactUs from './components/Pages/ContactUs/ContactUs';
//import DynamicPage from './components/Pages/DynamicPage/DynamicPage'

import { ThemeProvider } from 'styled-components';
import { mainTheme } from './styles/theme';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount(){
    // axios.get('https://react-boiler-5ecbd.firebaseio.com/siteInfo.json')
    // .then(response => {
    //   console.log('initial response', response)
    //   this.setState({ data: response.data})
    // })
    this.props.onInitWebsiteState();
  }

  render() {
    //console.log('app file state', this.state)
    console.log('app file props', this.props)
    let dynamicRoutes = null
    let homePage = null

    if (this.props.home !== null){
      homePage = this.props.home

      dynamicRoutes = this.props.navigationItems.map( (item, i) => {
        if (!item.dropdownPages){
          return <Route key={i} path={'/' + item.route } render={(props) => (<Dashboard pageInfo={item} {...props} />)}/>
        }
        else {
          return item.dropdownPages.map( (dropDownItem, i) => {
            return <Route key={i} path={'/pages/' + dropDownItem.route } render={(props) => (<Dashboard pageInfo={dropDownItem} {...props} />)} />
          })
        }
      })
    }


    return (
      <ThemeProvider theme={mainTheme}>
        <Layout>
          <Route path='/' exact render={(props) => (<Dashboard pageInfo={homePage} {...props} />)} />
          <Route path='/admin' component={Admin} />
          <Route path='/authenticate-admin' component={Auth} />
          <Route path='/ContactUs' component={ContactUs} />
          {dynamicRoutes}
        </Layout>
      </ThemeProvider>
    );
  }
}


const mapStateToProps = state => {
  return {
      home: state.dashboard.home,
      navigationItems: state.dashboard.navigationItems
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onInitWebsiteState: () => dispatch(actions.initWebsiteState()),
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

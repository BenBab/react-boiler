import React, { Component } from 'react';
import { Route }  from 'react-router-dom';
import axios from 'axios';

import Layout from './hoc/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import Admin from './containers/Admin/Admin';
import ContactUs from './components/Pages/ContactUs/ContactUs';
//import DynamicPage from './components/Pages/DynamicPage/DynamicPage'

import { ThemeProvider } from 'styled-components';
import { mainTheme } from './styles/theme';

class App extends Component {

  state = {
    data: null
  }
  
  componentDidMount(){
    axios.get('https://react-boiler-5ecbd.firebaseio.com/siteInfo.json')
    .then(response => {
      console.log('initial response', response)
      this.setState({ data: response.data})
    })
  }

  render() {
    console.log(this.state)
    let dynamicRoutes = null
    let homePage = null

    if (this.state.data !== null){
      homePage = this.state.data.home

      dynamicRoutes = this.state.data.navigationItems.map( (item, i) => {
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
          <Route path='/ContactUs' component={ContactUs} />
          {dynamicRoutes}
        </Layout>
      </ThemeProvider>
    );
  }
}

export default App;

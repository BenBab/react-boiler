import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import Dashboard from './containers/Dashboard/Dashboard'

import { ThemeProvider } from 'styled-components';
import { mainTheme } from './styles/theme';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={mainTheme}>
        <Layout>
          <Dashboard/>
        </Layout>
      </ThemeProvider>
    );
  }
}

export default App;

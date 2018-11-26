import React, { Component } from 'react'
import axios from 'axios';

export default class Dashboard extends Component {
  
  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      console.log('initial response', response)
    })
  }

  render() {
    return (
      <div>
        bashboard info
      </div>
    )
  }
}

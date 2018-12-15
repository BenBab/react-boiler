import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

import Spinner from '../../components/UI/Spinner'

class AuthModal extends Component {

  state = {
    email: '',
    password: ''
  }

  onFormChange = (event) => {
    const { name, value } = event.target
    this.setState({[name] : value })
  }
  
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.email, this.state.password, this.props.admin )
    this.props.isTimedOut(false)
  }

  backToHome = () => {
      this.props.history.push('/')
  }
  
  render() {
    console.log('AuthModal page props', this.props)

    let errorMessage = null;

    if (this.props.error) {
      // const errorCode={
      //   EMAIL_NOT_FOUND: 'There is no user record corresponding to this email address',
      //   INVALID_PASSWORD: 'The password entered was invalid - please try again',
      //   USER_DISABLED: 'The user account has been disabled by an administrator.',
      //   INVALID_EMAIL: 'The email address entered is invalid'
      // }
      errorMessage = (
        // <p>{ errorCode[this.props.error.message] }</p>
        <p>{ this.props.error }</p>
      );
    }

    return (
      <div>
        <div>
          Administrator Login
        </div>
          <input placeholder="email" name='email' value={this.state.email} onChange={this.onFormChange}/>
          <input placeholder="password" name='password' value={this.state.password} onChange={this.onFormChange}/>
          {errorMessage}
          <button onClick={this.backToHome}>Cancel</button>
          <button onClick={this.submitHandler}>Submit</button>
        {this.props.loading &&
          <Spinner/>
        }
        
          
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    admin: state.mainState.admin,
    isAuthenticated: state.auth.userId !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, admin) => dispatch(actions.auth(email, password, admin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
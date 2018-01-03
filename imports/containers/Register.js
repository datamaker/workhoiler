import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Authentication } from '../components';
import { registerRequest } from '../actions/authentication';

class Register extends Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(id, pw) {
    return this.props.registerRequest(id, pw).then(
            () => {
              if (this.props.status === 'SUCCESS') {
                Materialize.toast('Success! Please log in', 2000);
                browserHistory.push('/login');
                return true;
              }
                    /*
                       ERROR CODES:
                           1: BAD USERNAME
                           2: BAD PASSWORD
                           3: USERNAME EXISTS
                   */
              const errorMessage = [
                'Invalid Username',
                'Password is too short',
                'Username already exists',
              ];

              const $toastContent = $(`<span style="color: #FFB4BA">${errorMessage[this.props.error - 1]}</span>`);
              Materialize.toast($toastContent, 2000);
              return false;
            }
        );
  }
  render() {
    return (
      <div>
        <Authentication mode={false} onRegister={this.handleRegister} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.authentication.register.status,
  errorCode: state.authentication.register.error,
});

const mapDispatchToProps = dispatch => ({
  registerRequest: (id, pw) => dispatch(registerRequest(id, pw)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

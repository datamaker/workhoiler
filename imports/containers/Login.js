import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Authentication } from '../components';
import { loginRequest } from '../actions/authentication';


class Login extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(id, pw) {
    return this.props.loginRequest(id, pw).then(
            () => {
              if (this.props.status === 'SUCCESS') {
                const loginData = {
                  isLoggedIn: true,
                  username: id,
                };

                document.cookie = `key=${btoa(JSON.stringify(loginData))}`;

                Materialize.toast(`Welcome ${id}!`, 2000);
                browserHistory.push('/');
                return true;
              }
              const $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
              Materialize.toast($toastContet, 2000);
              return false;
            }
        );
  }

  render() {
    return (
      <div>
        <Authentication
          mode
          onLogin={this.handleLogin}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.authentication.login.status,
});

const mapDispatchToProps = dispatch => ({
  loginRequest: (id, pw) => dispatch(loginRequest(id, pw)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

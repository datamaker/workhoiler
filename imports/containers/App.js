import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Header } from '../components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from '../actions/authentication';
import { searchRequest } from '../actions/search';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleLogout() {
    this.props.logoutRequest().then(
            () => {
              Materialize.toast('Good Bye!', 2000);

                 // EMPTIES THE SESSION
              const loginData = {
                isLoggedIn: false,
                username: '',
              };

              document.cookie = `key=${btoa(JSON.stringify(loginData))}`;
            }
        );
  }

  handleSearch(keyword) {
    this.props.searchRequest(keyword);
  }

  componentDidMount() {
        // get cookie by name
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length == 2) return parts.pop().split(';').shift();
    }

        // get login data from cookie
    let loginData = getCookie('key');

        // if loginData is undefined, do nothing
    if (typeof loginData === 'undefined') return;

        // decode base64 & parse json
    loginData = JSON.parse(atob(loginData));

        // if not logged in, do nothing
    if (!loginData.isLoggedIn) return;

        // page refreshed & has a session in cookie,
        // check whether this cookie is valid or not
    this.props.getStatusRequest().then(
            () => {
              if (!this.props.status.valid) {
                    // if session is not valid
                    // logout the session
                loginData = {
                  isLoggedIn: false,
                  username: '',
                };

                document.cookie = `key=${btoa(JSON.stringify(loginData))}`;

                    // and notify
                const $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                Materialize.toast($toastContent, 4000);
              }
            }
        );
  }

  render() {
    const re = /(login|register)/;
    const isAuth = re.test(this.props.location.pathname);

    return (
      <div>
        <Helmet
          htmlAttributes={{ lang: 'ko' }}
          title={''}
          titleTemplate="%s | MemoPad"
          defaultTitle="MemoPad : React Sample Project"
          meta={[
                        { charset: 'utf-8' },
                        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
                        { name: 'keywords', content: 'React.js, velopert, Memopad' },
                        { name: 'description', content: 'Memo App implemented using React.js / MongoDB / Express.js' },
          ]}
          link={[
                        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
                        { rel: 'stylesheet', type: 'text/css', media: 'screen,projection', href: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css' },
          ]}
          script={[
                        { src: 'https://code.jquery.com/jquery-2.1.1.min.js', type: 'text/javascript' },
                        { src: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js', type: 'text/javascript' },
          ]}
        />
        { isAuth ? undefined : <Header
          isLoggedIn={this.props.status.isLoggedIn}
          onLogout={this.handleLogout}
          onSearch={this.handleSearch}
          usernames={this.props.searchResults}
        /> }
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.authentication.status,
  searchResults: state.search.usernames,
});

const mapDispatchToProps = dispatch => ({
  getStatusRequest: () => dispatch(getStatusRequest()),
  logoutRequest: () => dispatch(logoutRequest()),
  searchRequest: keyword => dispatch(searchRequest(keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

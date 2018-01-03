import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Link } from 'react-router';
import { Search } from '../components';

class Header extends Component {

  constructor(props) {
    super(props);

        // IMPLEMENT: CREATE A SEARCH STATUS

    this.state = {
      search: false,
    };

    this.toggleSearch = this.toggleSearch.bind(this);
  }

  toggleSearch() {
    this.setState({
      search: !this.state.search,
    });
  }

  render() {
    const loginButton = (
      <li>
        <Link to="/login"><i className="material-icons">vpn_key</i></Link>
      </li>
        );

    const logoutButton = (
      <li>
        <a onClick={this.props.onLogout}><i className="material-icons">lock_open</i></a>
      </li>
        );

    return (
      <div>
        <nav>
          <div className="nav-wrapper blue darken-1">
            <Link to="/" className="brand-logo center">MEMOPAD</Link>

            <ul>
              <li><a onClick={this.toggleSearch}><i className="material-icons">search</i></a></li>
            </ul>

            <div className="right">
              <ul>
                { this.props.isLoggedIn ? logoutButton : loginButton }
              </ul>
            </div>
          </div>
        </nav>
        <CSSTransitionGroup transitionName="search" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          { /* IMPLEMENT: SHOW SEARCH WHEN SEARCH STATUS IS TRUE */}
          {this.state.search ? <Search
            onClose={this.toggleSearch}
            onSearch={this.props.onSearch}
            usernames={this.props.usernames}
          /> : undefined }
        </CSSTransitionGroup>
      </div>
    );
  }
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func,
  usernames: PropTypes.array,
};

Header.defaultProps = {
  isLoggedIn: false,
  onLogout: () => { console.error('logout function not defined'); },
  usernames: [],
};

export default Header;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Write extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleChange(e) {
    this.setState({
      contents: e.target.value,
    });
  }

  handlePost() {
    const contents = this.state.contents;

    this.props.onPost(contents).then(
            () => {
              this.setState({
                contents: '',
              });
            }
        );
  }

  render() {
    return (
      <div className="container write">
        <div className="card">
          <div className="card-content">
            <textarea
              className="materialize-textarea" placeholder="Write down your memo"
              value={this.state.contents}
              onChange={this.handleChange}
            />
          </div>
          <div className="card-action">
            <a onClick={this.handlePost}>POST</a>
          </div>
        </div>
      </div>
    );
  }
}

Write.propTypes = {
  onPost: PropTypes.func,
};

Write.defaultProps = {
  onPost: (contents) => { console.error('onPost not defined'); },
};

export default Write;

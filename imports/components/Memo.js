import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router';

class Memo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      value: props.data.contents,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleStar = this.handleStar.bind(this);
  }

  componentDidMount() {
        // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN REFRESHED)
    $(`#dropdown-button-${this.props.data._id}`).dropdown({
      belowOrigin: true, // Displays dropdown below the button
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const current = {
      props: this.props,
      state: this.state,
    };

    const next = {
      props: nextProps,
      state: nextState,
    };

    const update = JSON.stringify(current) !== JSON.stringify(next);
    return update;
  }

  componentDidUpdate(prevProps, prveState) {
        // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN LOGGED IN)
    $(`#dropdown-button-${this.props.data._id}`).dropdown({
      belowOrigin: true, // Displays dropdown below the button
    });

    if (this.state.editMode) {
            // Trigger key up event to the edit input so that it auto-resizes (Materializecss Feature)
      $(this.input).keyup();
    }
  }

  toggleEdit() {
    if (this.state.editMode) {
      const id = this.props.data._id;
      const index = this.props.index;
      const contents = this.state.value;

      this.props.onEdit(id, index, contents).then(() => {
        this.setState({
          editMode: !this.state.editMode,
        });
      });
    } else {
      this.setState({
        editMode: !this.state.editMode,
      });
    }
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleRemove() {
    const id = this.props.data._id;
    const index = this.props.index;

    this.props.onRemove(id, index);
  }

  handleStar() {
    const id = this.props.data._id;
    const index = this.props.index;

    this.props.onStar(id, index);
  }

  render() {
    const { data, ownership } = this.props;

    const dropDownMenu = (
      <div className="option-button">
        <a
          className="dropdown-button"
          id={`dropdown-button-${data._id}`}
          data-activates={`dropdown-${data._id}`}
        >
          <i className="material-icons icon-button">more_vert</i>
        </a>
        <ul id={`dropdown-${data._id}`} className="dropdown-content">
          <li><a onClick={this.toggleEdit}>Edit</a></li>
          <li><a onClick={this.handleRemove}>Remove</a></li>
        </ul>
      </div>
        );

        // EDITED info
    const editedInfo = (
      <span style={{ color: '#AAB5BC' }}> · Edited <TimeAgo date={this.props.data.date.edited} live /></span>
        );

    const starStyle = (this.props.data.starred.indexOf(this.props.currentUser) > -1) ? { color: '#ff9980' } : { };

    const memoView = (
      <div className="card">
        <div className="info">
          <Link to={`/wall/${this.props.data.writer}`} className="username">{data.writer}</Link> wrote a log · <TimeAgo date={data.date.created} />
          { this.props.data.is_edited ? editedInfo : undefined }
          { ownership ? dropDownMenu : undefined }
        </div>
        <div className="card-content">
          {data.contents}
        </div>
        <div className="footer">
          <i className="material-icons log-footer-icon star icon-button" style={starStyle} onClick={this.handleStar}>star</i>
          <span className="star-count">{data.starred.length}</span>
        </div>
      </div>
        );

    const editView = (
      <div className="write">
        <div className="card">
          <div className="card-content">
            <textarea
              ref={(ref) => { this.input = ref; }}
              className="materialize-textarea"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div className="card-action">
            <a onClick={this.toggleEdit}>OK</a>
          </div>
        </div>
      </div>
        );

    return (
      <div className="container memo">
        { this.state.editMode ? editView : memoView }
      </div>
    );
  }
}

Memo.propTypes = {
  data: PropTypes.object,
  ownership: PropTypes.bool,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  onStar: PropTypes.func,
  currentUser: PropTypes.string,
};

Memo.defaultProps = {
  data: {
    _id: 'id12367890',
    writer: 'Writer',
    contents: 'Contents',
    is_edited: false,
    date: { edited: new Date(), created: new Date() },
    starred: [],
  },
  ownership: true,
  onEdit: (id, index, contents) => {
    console.error('onEdit not defined');
  },
  onRemove: (id, index) => {
    console.error('onRemove not defined');
  },
  onStar: (id, index) => {
    console.error('onStar not defined');
  },
  currentUser: '',
};

export default Memo;

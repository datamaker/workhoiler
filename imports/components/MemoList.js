import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { Memo } from '../components';

class MemoList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    const update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
    return update;
  }

  render() {
    const mapToComponents = data => data.map((memo, i) => (
      <Memo
        data={memo}
        ownership={memo.writer === this.props.currentUser}
        key={memo._id}
        onEdit={this.props.onEdit}
        onRemove={this.props.onRemove}
        onStar={this.props.onStar}
        index={i}
        currentUser={this.props.currentUser}
      />
                ));

    return (
      <div>
        <CSSTransitionGroup
          transitionName="memo"
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={1000}
        >
          {mapToComponents(this.props.data)}
        </CSSTransitionGroup>
      </div>
    );
  }
}

MemoList.propTypes = {
  data: PropTypes.array,
  currentUser: PropTypes.string,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  onStar: PropTypes.func,
};

MemoList.defaultProps = {
  data: [],
  currentUser: '',
  onEdit: (id, index, contents) => {
    console.error('onEdit not defined');
  },
  onRemove: (id, index) => {
    console.error('onRemove not defined');
  },
  onStar: (id, index) => {
    console.error('onStar not defined');
  },
};

export default MemoList;

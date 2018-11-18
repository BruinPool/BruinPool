import React, { Component } from 'react';
import PostModule from '../PostModule/PostModule';
import style from './EditModal.css';

class EditModal extends Component {
  constructor (props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick () {
    const { toggleEditModal } = this.props;
    toggleEditModal(false);
  }

  render () {
    const { edit, entry } = this.props;

    return (
      <div className={style.outerModal}>
        <div className={style.innerModal}>
          <button className={style.closeBtn} type="button" onClick={this.onClick}>
            <i className="fas fa-times-circle" />
          </button>
          <PostModule post={edit} entry={entry} />
        </div>
      </div>
    );
  }
}

export default EditModal;

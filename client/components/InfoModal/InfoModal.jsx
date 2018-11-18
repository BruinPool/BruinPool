import React, { Component } from 'react';
import FeedModuleEntry from '../FeedModuleEntry/FeedModuleEntry';
import style from './InfoModal.css';

class InfoModal extends Component {
  constructor (props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick () {
    const { toggleInfoModal } = this.props;
    toggleInfoModal(false);
  }

  render () {
    const { edit, entry, userInfo, cancel, toggleEditModal, fetchProfilePic, toggleInfoModal, driveCancel, join } = this.props;

    return (
      <div className={style.outerModal}>
        <div className={style.innerModal}>
          <button className={style.closeBtn} type="button" onClick={this.onClick}>
            <i className="fas fa-times-circle" />
          </button>
          <FeedModuleEntry  key={entry._id} fetchProfilePic={fetchProfilePic} entry={entry} userInfo={userInfo} join={join} cancel={cancel} driveCancel={driveCancel} isModal={true} edit={edit} toggleEditModal={toggleEditModal} toggleInfoModal={toggleInfoModal} />
        </div>
      </div>
    );
  }
}

export default InfoModal;

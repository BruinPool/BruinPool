import React, { Component } from 'react';
import style from './UpcomingFeedEntry.css';

class UpcomingFeedEntry extends Component {
  constructor (props) {
    super(props);
    this.state = {
      picUrl: '',
    };

    this.rideCancelHandle = this.rideCancelHandle.bind(this);
    this.driveCancelHandle = this.driveCancelHandle.bind(this);
    this.driveEditHandle = this.driveEditHandle.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const { fetchProfilePic, entry } = this.props;
    fetchProfilePic(entry.ownerUsername, (url) => {
      this.setState({ picUrl: url })
    });
  }

  rideCancelHandle () {
    const { entry, rideCancel, fetchRideFeed, fetchRideUpcoming } = this.props;
    rideCancel(entry);
    fetchRideFeed();
    fetchRideUpcoming();
  }

  driveCancelHandle () {
    const { entry, driveCancel, fetchDriveUpcoming } = this.props;
    driveCancel(entry);
    fetchDriveUpcoming();
  }

  driveEditHandle () {
    const { entry, toggleEditModal } = this.props;
    toggleEditModal(entry);
  }

  onClick () {
    const { entry, toggleInfoModal } = this.props;
    toggleInfoModal(entry);
  }

  render () {
    const {
      entry,
      userInfo,
      type,
      fetchProfilePic
    } = this.props;

    const { picUrl } = this.state;

    return (
      <div className={style.UpcomingFeedEntry}>
        <div className={style.entryBtn} type="button" onClick={this.onClick}>
          <div className={style.profilePicBox}>
            <img className={style.profilePic} alt="profilePic" src={picUrl} />
          </div>
          <div className={style.detail}>
            <div className={style.destination}>
              {entry.from} to
              <br />
              {entry.to}
            </div>
            <div className={style.margin} />
            <div className={style.date}>
              {new Date(entry.date).toLocaleDateString()}
            </div>
          </div>
        </div>
        {type === 'drive' ? (
          <div className={style.btnWrapper}>
            <button className={style.cancelBtn} type="button" onClick={this.driveCancelHandle}>
              <i className="fas fa-times-circle" />
            </button>
            <button className={style.editBtn} type="button" onClick={this.driveEditHandle}>
              <i className="fas fa-edit" />
            </button>
          </div>
        ) : (
          <button className={style.cancelBtn} type="button" onClick={this.rideCancelHandle}>
            <i className="fas fa-times-circle" />
          </button>
        )}
      </div>
    );
  }
}

export default UpcomingFeedEntry;

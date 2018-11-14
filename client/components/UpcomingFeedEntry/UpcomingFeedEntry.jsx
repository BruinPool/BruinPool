import React, { Component } from 'react';
import style from './UpcomingFeedEntry.css';

class UpcomingFeedEntry extends Component {
  constructor (props) {
    super(props);

    this.rideCancelHandle = this.rideCancelHandle.bind(this);
    this.driveCancelHandle = this.driveCancelHandle.bind(this);
  }

  rideCancelHandle () {
    const { entry, rideCancel } = this.props;

    rideCancel(entry);
  }

  driveCancelHandle () {
    const { entry, driveCancel } = this.props;

    driveCancel(entry);
  }

  render () {
    const {
      entry,
      userInfo,
      type,
    } = this.props;

    return (
      <div className={style.UpcomingFeedEntry}>
        <div className={style.profilePic}>
          <i className="fas fa-user-circle" />
        </div>
        <div className={style.detail}>
          <div className={style.destination}>
            {`${entry.from} to ${entry.to}`}
          </div>
          <div className={style.margin} />
          <div className={style.date}>
            {new Date(entry.date).toLocaleDateString()}
          </div>
        </div>
        {type === 'drive' ? (
          <button className={style.cancelBtn} type="button" onClick={this.driveCancelHandle}>
            <i className="fas fa-times-circle" />
          </button>
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

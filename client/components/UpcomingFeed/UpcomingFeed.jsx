import React, { Component } from 'react';
import style from './UpcomingFeed.css';
import UpcomingFeedEntry from '../UpcomingFeedEntry/UpcomingFeedEntry';

class UpcomingFeed extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      upcomingRide,
      userInfo,
      rideCancel,
      driveCancel,
      type,
    } = this.props;

    return (
      <div className={style.UpcomingFeed}>
        <div className={style.head}>
          Upcoming
          {type === 'drive' ? (<span className={style.driveHead}> drives</span>) : (<span className={style.rideHead}> rides</span>)}
        </div>
        {upcomingRide.map(entry => <UpcomingFeedEntry key={entry._id} entry={entry} userInfo={userInfo} rideCancel={rideCancel} driveCancel={driveCancel} type={type} />)}
      </div>
    );
  }
}

export default UpcomingFeed;

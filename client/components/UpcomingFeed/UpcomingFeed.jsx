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
      userInfo
    } = this.props;

    return (
      <div className={style.UpcomingFeed}>
        <div className={style.head}>
          Upcoming rides
        </div>
        {upcomingRide.map(entry => <UpcomingFeedEntry key={entry._id} entry={entry} userInfo={userInfo} />)}
      </div>
    );
  }
}

export default UpcomingFeed;

import React, { Component } from 'react';
import style from './RideHistory.css';
import RideHistoryEntry from '../RideHistoryEntry/RideHistoryEntry';

class RideHistory extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      rideHistory,
      userInfo
    } = this.props;

    return (
      <div className={style.RideHistory}>
        <div className={style.head}>
          <div className={style.seats}>
            Seats
          </div>
          <div className={style.divider} />
          <div className={style.from}>
            From
          </div>
          <div className={style.divider} />
          <div className={style.to}>
            To
          </div>
          <div className={style.divider} />
          <div className={style.date}>
            Date
          </div>
          <div className={style.divider} />
          <div className={style.price}>
            Price
          </div>
        </div>
        {rideHistory.map(entry => <RideHistoryEntry key={entry._id} entry={entry} userInfo={userInfo} />)}
      </div>
    );
  }
}

export default RideHistory;

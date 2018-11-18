import React, { Component } from 'react';
import style from './RideHistory.css';
import RideHistoryEntry from '../RideHistoryEntry/RideHistoryEntry';

class RideHistory extends Component {
  constructor (props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick () {
    const { fetchMoreDriveHistory } = this.props;
    fetchMoreDriveHistory();
  }

  render () {
    const {
      driveHistory,
      userInfo,
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
        {driveHistory.map(entry => <RideHistoryEntry key={entry._id} entry={entry} userInfo={userInfo} />)}
        <button className={style.fetchMoreDriveHistoryBtn} type="button" onClick={this.onClick} >
          Load more
        </button>
      </div>
    );
  }
}

export default RideHistory;

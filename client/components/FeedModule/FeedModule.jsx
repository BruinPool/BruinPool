import React, { Component } from 'react';
import style from './FeedModule.css';
import FeedModuleEntry from '../FeedModuleEntry/FeedModuleEntry';

class FeedModule extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      rideFeed,
      userInfo,
      cancel,
    } = this.props;

    return (
      <div className={style.FeedModule}>
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
        {rideFeed.map(entry => <FeedModuleEntry key={entry._id} entry={entry} userInfo={userInfo} cancel={cancel} />)}
      </div>
    );
  }
}

export default FeedModule;

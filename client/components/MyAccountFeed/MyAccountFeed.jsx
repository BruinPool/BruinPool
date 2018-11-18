import React, { Component } from 'react';
import style from './MyAccountFeed.css';
import MyAccountFeedEntry from '../MyAccountFeedEntry/MyAccountFeedEntry';

class MyAccountFeed extends Component {
  constructor() {
    super();
    this.state = {
      browserWidth: window.innerWidth,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick (e) {
    const { fetch, type } = this.props;
    if (e.target.id === 'right') {
      fetch(type);
    }
  }

  render () {
    const cropData = (feed, pageNum) => {
      const result = [];

      for (let i = pageNum * 5 - 5; i <= pageNum * 5 - 1; i++) {
        if (feed[i]) {
          result.push(feed[i]);
        }
      }
      return result;
    };

    const {
      feed,
      userInfo,
      rideHistoryPage,
      driveHistoryPage,
      type,
    } = this.props;
    const { browserWidth } = this.state;
    let reducedFeed;
    if (type === 'rideHistory') {
      reducedFeed = cropData(feed, rideHistoryPage);
    }
    if (type === 'driveHistory') {
      reducedFeed = cropData(feed, driveHistoryPage);
    }
    return (
      <div className={style.MyAccountFeed}>
        {browserWidth > 480 && (
          <div id="left" className={style.leftBtn} type="button" onClick={this.onClick}>
            <i className="fas fa-chevron-circle-left" />
          </div>
        )}
        {reducedFeed.map(entry => <MyAccountFeedEntry key={entry._id} entry={entry} userInfo={userInfo} />)}
        {browserWidth > 480 && (
          <div id ="right" className={style.rightBtn} type="button" onClick={this.onClick}>
            <i className="fas fa-chevron-circle-right" />
          </div>
        )}
      </div>
    );
  }
}

export default MyAccountFeed;
